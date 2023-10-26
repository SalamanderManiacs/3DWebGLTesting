function GLLib() {
  this.generateBasicUUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  };
  this.deg = function(r) {
    return r * 180 / Math.PI;
  }
  this.rad = function(d) {
    return d * Math.PI / 180;
  }



  this.matrix4 = function() {
    this.generatePerspectiveMatrix = function(fieldOfViewInRadians, aspect, near, far) {
      var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
      var rangeInv = 1.0 / (near - far);

      return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
      ];
    }
    this.basicMatrix = function() {
      return [
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1
      ]
    }
    this.multiply = function(a, b) {
      var a00 = a[0 * 4 + 0];
      var a01 = a[0 * 4 + 1];
      var a02 = a[0 * 4 + 2];
      var a03 = a[0 * 4 + 3];
      var a10 = a[1 * 4 + 0];
      var a11 = a[1 * 4 + 1];
      var a12 = a[1 * 4 + 2];
      var a13 = a[1 * 4 + 3];
      var a20 = a[2 * 4 + 0];
      var a21 = a[2 * 4 + 1];
      var a22 = a[2 * 4 + 2];
      var a23 = a[2 * 4 + 3];
      var a30 = a[3 * 4 + 0];
      var a31 = a[3 * 4 + 1];
      var a32 = a[3 * 4 + 2];
      var a33 = a[3 * 4 + 3];
      var b00 = b[0 * 4 + 0];
      var b01 = b[0 * 4 + 1];
      var b02 = b[0 * 4 + 2];
      var b03 = b[0 * 4 + 3];
      var b10 = b[1 * 4 + 0];
      var b11 = b[1 * 4 + 1];
      var b12 = b[1 * 4 + 2];
      var b13 = b[1 * 4 + 3];
      var b20 = b[2 * 4 + 0];
      var b21 = b[2 * 4 + 1];
      var b22 = b[2 * 4 + 2];
      var b23 = b[2 * 4 + 3];
      var b30 = b[3 * 4 + 0];
      var b31 = b[3 * 4 + 1];
      var b32 = b[3 * 4 + 2];
      var b33 = b[3 * 4 + 3];
      return [
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
      ];
    }
    this.translationMatrix = function(tx, ty, tz) {
      return [
         1,  0,  0,  0,
         0,  1,  0,  0,
         0,  0,  1,  0,
         tx, ty, tz, 1,
      ];
    }
    this.xRotationMatrix = function(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);

      return [
        1, 0, 0, 0,
        0, c, s, 0,
        0, -s, c, 0,
        0, 0, 0, 1,
      ];
    },

    this.yRotationMatrix = function(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);

      return [
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1,
      ];
    }
    this.zRotationMatrix = function(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);

      return [
         c, s, 0, 0,
        -s, c, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1,
      ];
    }
    this.scalingMatrix = function(sx, sy, sz) {
      return [
        sx, 0,  0,  0,
        0, sy,  0,  0,
        0,  0, sz,  0,
        0,  0,  0,  1,
      ];
    }
    this.translate = function(m, tx, ty, tz) {
      return this.multiply(m, this.translationMatrix(tx, ty, tz));
    }
    this.xRotate = function(m, angleInRadians) {
      return this.multiply(m, this.xRotationMatrix(angleInRadians));
    }
    this.yRotate = function(m, angleInRadians) {
      return this.multiply(m, this.yRotationMatrix(angleInRadians));
    }
    this.zRotate = function(m, angleInRadians) {
      return this.multiply(m, this.zRotationMatrix(angleInRadians));
    }
    this.scale = function(m, sx, sy, sz) {
      return this.multiply(m, this.scalingMatrix(sx, sy, sz));
    }
  }



  this.face = function (glArr, options) {
    this.points = glArr;
    this.color = options.color || [1, 1, 1];
  };
  this.face.prototype.toString = function () {
    return "face[" + this.points + "]";
  };



  this.rectMesh3D = function(options) {
    var color = options.color || [[255,255,255]];
    var c1,c2,c3,c4,c5,c6;
    if (color.length == 1) {
      c1 = color[0];
      c2 = color[0];
      c3 = color[0];
      c4 = color[0];
      c5 = color[0];
      c6 = color[0];
    } else {
      c1 = color[0];
      c2 = color[1];
      c3 = color[2];
      c4 = color[3];
      c5 = color[4];
      c6 = color[5];
    }
  }



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
    this.rotation = options.rotation || [0,0,0];
    this.position = options.position || [0,0,0];
    this.scale = options.scale || [1,1,1];
    // this.opacity = options.opacity || 1;
    this.id = options.id || "";
  };
  this.object.prototype.calculateMatrix = function (m4) {
    var matrix = m4.basicMatrix();
    matrix = m4.translate(matrix, this.position[0], this.position[1], this.position[2]);
    matrix = m4.xRotate(matrix, this.rotation[0]);
    matrix = m4.yRotate(matrix, this.rotation[1]);
    matrix = m4.zRotate(matrix, this.rotation[2]);
    matrix = m4.scale(matrix, this.scale[0], this.scale[1], this.scale[2]);
    
    return matrix;
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

      uniform mat4 u_matrix;

      varying vec4 v_color;

      void main() {
        gl_Position = u_matrix * a_position;

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
    if (object.id == "") {
      object.id = this.uuidGen();
    }
    this.objects[object.id] = object;
  };
  this.scene.prototype.getObjectByID = function (id) {
    return this.objects[id] || new object({});
  };
  this.scene.prototype.setCustomShaderSources = function (vs, fs) {
    this.shaderSources.vs = vs;
    this.shaderSources.fs = fs;
  };
  this.scene.prototype.bindCanvas = function (canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext("webgl2");
  };
  this.scene.prototype.bindGLL = function (gll) {
    this.gll = gll;
    this.m4 = new gll.matrix4();
    this.uuidGen = gll.generateBasicUUID;
    this.deg = gll.deg;
    this.rad = gll.rad;
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

    this.matrixLocation = this.gl.getUniformLocation(this.program, "u_matrix");
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
  this.scene.prototype.render = function () {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0, 0, 0, 0.3);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.useProgram(this.program);

    var objs = Object.values(this.objects);
    for (var i = 0; i < objs.length; i++) {
      var iobj = objs[i].getGLBuffer();
      var va = iobj.vertexArr;
      var ca = iobj.colorArr;
      var ma = objs[i].calculateMatrix(this.m4);

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(va), this.gl.DYNAMIC_DRAW);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Uint8Array(ca), this.gl.DYNAMIC_DRAW);
      
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

      this.gl.uniformMatrix4fv(this.matrixLocation, false, ma);

      var primitiveType = this.gl.TRIANGLES;
      offset = 0;
      var count = va.length / 3;
      this.gl.drawArrays(primitiveType, offset, count);
    }
  };
}

log("GLLib loaded.");