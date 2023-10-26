function GLLib() {
  this.generateBasicUUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;
      return (c === 'x' ? r : (r & (0x3 | 0x8))).toString(16);
    });
  };



  this.face = function (glArr, options) {
    this.points = glArr;
    this.color = options.color || [1, 1, 1];
  };
  this.face.prototype.toString = function () {
    return "face[" + this.points + "]";
  };



  this.mesh = function (faces) {
    this.faces = faces;
  };
  this.mesh.prototype.toGLBuffer = function () {
    var obj = {
      vertexArr: [],
      colorArr: [],
    };
    for (var i = 0; i < this.faces.length; i++) {
      var points = this.faces[i].points;
      obj.vertexArr = obj.vertexArr.concat(points);
      for (var n = 0; n < points.length / 3; n++) {
        obj.colorArr = obj.colorArr.concat(this.faces[i].color);
      }
    }
    return obj;
  };
  this.mesh.prototype.toString = function () {
    var f = "mesh[";
    for (var i = 0; i < this.faces.length; i++) {
      f += this.faces[i].toString();
      if (i + 1 < this.faces.length) {
        f += ",";
      }
    }
    f += "]";
    return f;
  };



  this.object = function (options) {
    this.mesh = options.mesh || new mesh([new face([
      0, 0,
      0, 1,
      1, 1
    ])]);
    // this.rotation = options.rotation || new vector3(0,0,0);
    // this.position = options.position || new vector3(0,0,0);
    // this.scale = options.scale || new vector3(1,1,1);
    // this.opacity = options.opacity || 1;
    this.id = options.id || generateBasicUUID();
  };
  this.object.prototype.getGLBuffer = function () {
    return this.mesh.toGLBuffer();
  };



  this.scene = function (settings) {
    this.settings = settings || {};
    this.objects = {};
    this.shaderSources = {
      vs: `

      attribute vec4 a_position;
      attribute vec4 a_color;

      varying vec4 v_color;

      void main() {
        gl_Position = a_position;

        v_color = a_color;
      }

    `,
      fs: `

      precision highp float;

      varying vec4 v_color;

      void main() {
        gl_FragColor = v_color;
      }

    `
    };
  };
  this.scene.prototype.addObject = function (object) {
    this.objects[object.id] = object;
  };
  this.scene.prototype.getObjectByID = function (id) {
    return this.objects[id] || new object({});
  };
  this.scene.prototype.getAllObjectBuffers = function () {
    var obj = {
      vertexArr: [],
      colorArr: [],
    };
    var objs = Object.values(this.objects);
    for (var i = 0; i < objs.length; i++) {
      var iobj = objs[i].getGLBuffer();
      obj.vertexArr = obj.vertexArr.concat(iobj.vertexArr);
      obj.colorArr = obj.colorArr.concat(iobj.colorArr);
    }
    return obj;
  };
  this.scene.prototype.setCustomShaderSources = function (vs, fs) {
    this.shaderSources.vs = vs;
    this.shaderSources.fs = fs;
  };
  this.scene.prototype.bindCanvas = function (canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext("webgl2");
  };
  this.scene.prototype.compileShader = function (type) {
    var source;
    if (type === this.gl.VERTEX_SHADER) {
      source = this.shaderSources.vs;
    } else if (type === this.gl.FRAGMENT_SHADER) {
      source = this.shaderSources.fs;
    }
    var shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) {
      if (type === this.gl.VERTEX_SHADER) {
        this.vs = shader;
      } else if (type === this.gl.FRAGMENT_SHADER) {
        this.fs = shader;
      }
      return true;
    } else {
      alert("Error Compiling Shader " + this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return false;
    }
  };
  this.scene.prototype.compileProgram = function () {
    var vertexShader = this.compileShader(this.gl.VERTEX_SHADER);
    if (!vertexShader) {
      return false;
    }
    var fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
      return false;
    }
    var program = this.gl.createProgram();
    this.gl.attachShader(program, this.vs);
    this.gl.attachShader(program, this.fs);
    this.gl.linkProgram(program);
    var success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (success) {
      this.program = program;
      return true;
    } else {
      this.gl.deleteProgram(program);
      return false;
    }
  };
  this.scene.prototype.setupLocations = function () {
    this.vertexLocation = this.gl.getAttribLocation(this.program, "a_position");
    this.colorLocation = this.gl.getAttribLocation(this.program, "a_color");
  };
  this.scene.prototype.setupBuffers = function () {
    this.vertexBuffer = this.gl.createBuffer();
    this.colorBuffer = this.gl.createBuffer();
  };
  this.scene.prototype.prep = function () {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.compileProgram();
    this.setupLocations();
    this.setupBuffers();
  };
  this.scene.prototype.refreshBuffers = function (buffers) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(buffers.vertexArr), this.gl.DYNAMIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Uint8Array(buffers.colorArr), this.gl.DYNAMIC_DRAW);
  };
  this.scene.prototype.render = function () {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0, 0, 0, 0.3);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.useProgram(this.program);
    var buffers = this.getAllObjectBuffers();
    this.refreshBuffers(buffers);

    this.gl.enableVertexAttribArray(this.vertexLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    var size = 3;
    var type = this.gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    this.gl.vertexAttribPointer(this.vertexLocation, size, type, normalize, stride, offset);

    this.gl.enableVertexAttribArray(this.colorLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    size = 3;
    type = this.gl.UNSIGNED_BYTE;
    normalize = true;
    stride = 0;
    offset = 0;
    this.gl.vertexAttribPointer(this.colorLocation, size, type, normalize, stride, offset);

    var primitiveType = this.gl.TRIANGLES;
    offset = 0;
    var count = buffers.vertexArr.length / 3;
    this.gl.drawArrays(primitiveType, offset, count);
  };
  this.scene.prototype.renderNoRefresh = function () {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.useProgram(this.program);
    var buffers = this.getAllObjectBuffers();

    this.gl.enableVertexAttribArray(this.vertexLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    var size = 3;
    var type = this.gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    this.gl.vertexAttribPointer(this.vertexLocation, size, type, normalize, stride, offset);

    this.gl.enableVertexAttribArray(this.colorLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    size = 3;
    type = this.gl.UNSIGNED_BYTE;
    normalize = true;
    stride = 0;
    offset = 0;
    this.gl.vertexAttribPointer(this.colorLocation, size, type, normalize, stride, offset);

    var primitiveType = this.gl.TRIANGLES;
    offset = 0;
    var count = buffers.vertexArr.length / 3;
    this.gl.drawArrays(primitiveType, offset, count);
  };
}

log("GLLib loaded.");