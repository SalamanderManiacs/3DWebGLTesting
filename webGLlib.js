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
    this.inverse = function(m) {
      var m00 = m[0 * 4 + 0];
      var m01 = m[0 * 4 + 1];
      var m02 = m[0 * 4 + 2];
      var m03 = m[0 * 4 + 3];
      var m10 = m[1 * 4 + 0];
      var m11 = m[1 * 4 + 1];
      var m12 = m[1 * 4 + 2];
      var m13 = m[1 * 4 + 3];
      var m20 = m[2 * 4 + 0];
      var m21 = m[2 * 4 + 1];
      var m22 = m[2 * 4 + 2];
      var m23 = m[2 * 4 + 3];
      var m30 = m[3 * 4 + 0];
      var m31 = m[3 * 4 + 1];
      var m32 = m[3 * 4 + 2];
      var m33 = m[3 * 4 + 3];
      var tmp_0  = m22 * m33;
      var tmp_1  = m32 * m23;
      var tmp_2  = m12 * m33;
      var tmp_3  = m32 * m13;
      var tmp_4  = m12 * m23;
      var tmp_5  = m22 * m13;
      var tmp_6  = m02 * m33;
      var tmp_7  = m32 * m03;
      var tmp_8  = m02 * m23;
      var tmp_9  = m22 * m03;
      var tmp_10 = m02 * m13;
      var tmp_11 = m12 * m03;
      var tmp_12 = m20 * m31;
      var tmp_13 = m30 * m21;
      var tmp_14 = m10 * m31;
      var tmp_15 = m30 * m11;
      var tmp_16 = m10 * m21;
      var tmp_17 = m20 * m11;
      var tmp_18 = m00 * m31;
      var tmp_19 = m30 * m01;
      var tmp_20 = m00 * m21;
      var tmp_21 = m20 * m01;
      var tmp_22 = m00 * m11;
      var tmp_23 = m10 * m01;
  
      var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
          (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
      var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
          (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
      var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
          (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
      var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
          (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
  
      var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
  
      return [
        d * t0,
        d * t1,
        d * t2,
        d * t3,
        d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
              (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
        d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
              (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
        d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
              (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
        d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
              (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
        d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
              (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
        d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
              (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
        d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
              (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
        d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
              (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
        d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
              (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
        d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
              (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
        d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
              (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
        d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
              (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
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
    this.normalize = function(v, dst) {
      dst = dst || [];
      var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      if (length > 0.00001) {
        dst[0] = v[0] / length;
        dst[1] = v[1] / length;
        dst[2] = v[2] / length;
      }
      return dst;
    }
  }



  this.face = function (glArr, options) {
    this.points = glArr;
    this.color = options.color || [0, 0, 0, 255];
    if (this.color.length == 3) {
      this.color.push(255);
    }
    this.normal = [];
    log(this.normal);
    if (this.points.length > 3) {
      this.normal = [this.points[0],this.points[1],this.points[2]];
    }
    log(this.normal);
    for(var i = 3; i < this.points.length; i+=3) {
      this.normal = [(this.normal[0]+this.points[i])/2,(this.normal[1]+this.points[i+1])/2,(this.normal[2]+this.points[i+2])/2];
    }
  };
  this.face.prototype.toString = function () {
    return "face[" + this.points + "]";
  };


  this.sphereMesh3D = function(gll, options) {
    var color = options.color || [255,255,255];
    var lat = options.lon*2 || 10;
    var lon = options.lat*2 || 10;
    log([lat,lon])
    var mesh = new gll.mesh([]);
    points = [];
    for (var m = 0; m < lat + 1; m++) {
      points[m-1] = [];
      for (var n = 0; n < lon; n++) {
        x = Math.sin(Math.PI * m / lat) * Math.sin(2 * Math.PI * n / lon);
        y = Math.cos(Math.PI * m / lat);
        z = Math.sin(Math.PI * m / lat) * Math.cos(2 * Math.PI * n / lon);
        if (((m + 1) % 2) == 0) {
          points[m-1][n] = [x,y,z];
        } else { 
          points[m-1][n] = [x,y,z];
        }
        //var face = new gll.face([x,y,z],{color:color});
        //mesh.addFace(face);
      }
    }
    for (var m = 0; m < lat - 1; m++) {
      var pointListBelow = points[m-1];
      var pointList = points[m];
      var pointListAbove = points[m+1];
      for (var n = 0; n < lon; n++) {
        var indexMinus = (n-1);
        if (indexMinus == -1) {
          indexMinus = pointListAbove.length-1;
        }
        var xyz1, xyz2, xyz3;
        xyz1 = pointList[n];
        xyz2 = pointListAbove[n];
        xyz3 = pointListAbove[indexMinus];
        var face = new gll.face([
          xyz1[0], xyz1[1], xyz1[2],
          xyz2[0], xyz2[1], xyz2[2],
          xyz3[0], xyz3[1], xyz3[2]
        ], {
          color: color
        });
        mesh.addFace(face);

        var indexPlus = ((n + 1) % pointList.length);
        var xyz1, xyz2, xyz3;
        xyz1 = pointList[n];
        xyz2 = pointListBelow[n];
        xyz3 = pointListBelow[indexPlus];
        var face = new gll.face([
          xyz1[0], xyz1[1], xyz1[2],
          xyz2[0], xyz2[1], xyz2[2],
          xyz3[0], xyz3[1], xyz3[2]
        ], {
          color: color
        });
        mesh.addFace(face);
      }
    }
    var pointListAbove = points[0];
    for (var n = 0; n < lon; n++) {
      var indexMinus = (n-1);
      if (indexMinus == -1) {
        indexMinus = pointListAbove.length-1;
      }
      var xyz1, xyz2, xyz3;
      xyz1 = [0, 1, 0];
      xyz2 = pointListAbove[n];
      xyz3 = pointListAbove[indexMinus];
      var face = new gll.face([
        xyz1[0], xyz1[1], xyz1[2],
        xyz2[0], xyz2[1], xyz2[2],
        xyz3[0], xyz3[1], xyz3[2]
      ], {
        color: color
      });
      mesh.addFace(face);
    }
    var pointListBelow = points[points.length-2];
    for (var n = 0; n < lon; n++) {
      var indexPlus = ((n + 1) % pointListBelow.length);
      var xyz1, xyz2, xyz3;
      xyz1 = [0, -1, 0];
      xyz2 = pointListBelow[n];
      xyz3 = pointListBelow[indexPlus];
      var face = new gll.face([
        xyz1[0], xyz1[1], xyz1[2],
        xyz2[0], xyz2[1], xyz2[2],
        xyz3[0], xyz3[1], xyz3[2]
      ], {
        color: color
      });
      mesh.addFace(face);
    }
    return mesh; 
  }


  this.rectMesh3D = function(gll, options) {
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
    return new gll.mesh([
      //top
      new gll.face([
        -1, 1, -1,
        -1, 1, 1,
        1, 1, -1,
      ], {
        color: c1
      }),
      new gll.face([
        1, 1, 1,
        1, 1, -1,
        -1, 1, 1,
      ], {
        color: c1
      }),

      //bottom
      new gll.face([
        -1, -1, -1,
        1, -1, -1,
        -1, -1, 1,
      ], {
        color: c2
      }),
      new gll.face([
        1, -1, 1,
        -1, -1, 1,
        1, -1, -1,
      ], {
        color: c2
      }),



      //front
      new gll.face([
        -1, 1, 1,
        -1, -1, 1,
        1, -1, 1,
      ], {
        color: c3
      }),
      new gll.face([
        1, 1, 1,
        -1, 1, 1,
        1, -1, 1,
      ], {
        color: c3
      }),

      //back
      new gll.face([
        1, -1, -1,
        -1, -1, -1,
        -1, 1, -1,
      ], {
        color: c4
      }),
      new gll.face([
        1, 1, -1,
        1, -1, -1,
        -1, 1, -1,
      ], {
        color: c4
      }),



      //left
      new gll.face([
        -1, 1, 1,
        -1, 1, -1,
        -1, -1, 1,
      ], {
        color: c5
      }),
      new gll.face([
        -1, -1, -1,
        -1, -1, 1,
        -1, 1, -1,
      ], {
        color: c5
      }),

      //right
      new gll.face([
        1, 1, 1,
        1, -1, 1,
        1, 1, -1,
      ], {
        color: c6
      }),
      new gll.face([
        1, -1, -1,
        1, 1, -1,
        1, -1, 1,
      ], {
        color: c6
      }),
    ]);
  }



  this.mesh = function (faces) {
    this.faces = faces || [];
  };
  this.mesh.prototype.addFace = function (f) {
    this.faces.push(f);
  };
  this.mesh.prototype.toGLBuffer = function () {
    var obj = {
      vertexArr: [],
      colorArr: [],
      normalArr: [],
    };
    for (var i = 0; i < this.faces.length; i++) {
      var points = this.faces[i].points;
      obj.vertexArr = obj.vertexArr.concat(points);
      for (var n = 0; n < points.length / 3; n++) {
        obj.colorArr = obj.colorArr.concat(this.faces[i].color);
        obj.normalArr = obj.normalArr.concat(this.faces[i].normal);
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
  this.object.prototype.rotate = function (rotation) {
    this.rotation[0] += rotation[0];
    this.rotation[1] += rotation[1];
    this.rotation[2] += rotation[2];
  }
  this.object.prototype.calculateMatrix = function (m4) {
    var matrix = m4.basicMatrix();
    matrix = m4.translate(matrix, this.position[0], this.position[1], this.position[2]);
    matrix = m4.scale(matrix, this.scale[0], this.scale[1], this.scale[2]);
    matrix = m4.xRotate(matrix, this.rotation[0]);
    matrix = m4.yRotate(matrix, this.rotation[1]);
    matrix = m4.zRotate(matrix, this.rotation[2]);
    
    return matrix;
  };
  this.object.prototype.getGLBuffer = function () {
    return this.mesh.toGLBuffer();
  };



  this.camera = function(options) {
    this.rotation = options.rotation || [0,0,0];
    this.position = options.position || [0,0,0];
    this.fov = options.fov || 1.22173;
    this.near = options.near || 1;
    this.far = options.far || 2000;
  }
  this.camera.prototype.createVeiwMatrix = function(m4,aspect) {
    var projectionMatrix = m4.generatePerspectiveMatrix(this.fov, aspect, this.near, this.far);

    var cameraMatrix = m4.basicMatrix();
    cameraMatrix = m4.xRotate(cameraMatrix, this.rotation[0]);
    cameraMatrix = m4.yRotate(cameraMatrix, this.rotation[1]);
    cameraMatrix = m4.zRotate(cameraMatrix, this.rotation[2]);
    cameraMatrix = m4.translate(cameraMatrix, this.position[0], this.position[1], this.position[2]);

    var viewMatrix = m4.inverse(cameraMatrix);

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    this.matrixBuffer = viewProjectionMatrix;
    
  };



  this.scene = function (settings) {
    this.settings = settings || {};
    this.objects = {};
    this.shaderSources = {
      vs: `

      attribute vec4 a_position;
      attribute vec4 a_color;
      attribute vec3 a_normal;

      uniform mat4 u_matrix;

      varying vec4 v_color;
      varying vec3 v_normal;

      void main() {
        gl_Position = u_matrix * a_position;
        gl_PointSize = 5.0;

        v_color = a_color;
      }

    `,
      fs: `

      precision highp float;

      varying vec4 v_color;
      varying vec3 v_normal;

      uniform vec3 u_reverseLightDirection;

      void main() {
        vec3 normal = normalize(v_normal);

        float light = dot(normal, u_reverseLightDirection);

        gl_FragColor = v_color;

        gl_FragColor.rgb *= light;
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
    this.gl = canvas.getContext("webgl2", {
      alpha: false
    });
  };
  this.scene.prototype.setCamera = function (camera) {
    this.camera = camera;
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
    this.normalLocation = this.gl.getAttribLocation(this.program, "a_normal");

    this.matrixLocation = this.gl.getUniformLocation(this.program, "u_matrix");
    this.reverseLightDirLocation = this.gl.getUniformLocation(this.program, "u_reverseLightDirection");
    
  };
  this.scene.prototype.setupBuffers = function () {
    this.vertexBuffer = this.gl.createBuffer();
    this.colorBuffer = this.gl.createBuffer();
    this.normalBuffer = this.gl.createBuffer();
  };
  this.scene.prototype.prep = function () {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.compileProgram();
    this.setupLocations();
    this.setupBuffers();
  };
  this.scene.prototype.render = function () {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(1, 1, 1, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.useProgram(this.program);

    var aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    this.camera.createVeiwMatrix(this.m4, aspect);
    var camPos = camera.position;
    var reverseLightDir = m4.normalize([camPos.x*-1,camPos.y*-1,camPos.z*-1]);

    var objs = Object.values(this.objects);
    for (var i = 0; i < objs.length; i++) {
      var iobj = objs[i].getGLBuffer();
      var va = iobj.vertexArr;
      var ca = iobj.colorArr;
      var na = iobj.normalArr;
      var ma = objs[i].calculateMatrix(this.m4);
      ma = this.m4.multiply(this.camera.matrixBuffer, ma);

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(va), this.gl.DYNAMIC_DRAW);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Uint8Array(ca), this.gl.DYNAMIC_DRAW);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(na), this.gl.DYNAMIC_DRAW);
      
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
      size = 4;
      type = this.gl.UNSIGNED_BYTE;
      normalize = true;
      stride = 0;
      offset = 0;
      this.gl.vertexAttribPointer(this.colorLocation, size, type, normalize, stride, offset);

      his.gl.enableVertexAttribArray(this.normalLocation);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
      var size = 3;
      var type = this.gl.FLOAT;
      var normalize = false;
      var stride = 0;
      var offset = 0;
      this.gl.vertexAttribPointer(this.normalLocation, size, type, normalize, stride, offset);

      this.gl.uniformMatrix4fv(this.matrixLocation, false, ma);
      this.gl.uniform3fv(this.reverseLightDirLocation, reverseLightDir);

      var primitiveType = this.gl.TRIANGLES;
      offset = 0;
      var count = va.length / 3;
      this.gl.drawArrays(primitiveType, offset, count);
    }
  };

  this.scene.prototype.renderPoints = function () {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(1, 1, 1, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.useProgram(this.program);

    var aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    this.camera.createVeiwMatrix(this.m4, aspect);

    var objs = Object.values(this.objects);
    for (var i = 0; i < objs.length; i++) {
      var iobj = objs[i].getGLBuffer();
      var va = iobj.vertexArr;
      var ca = iobj.colorArr;
      var na = iobj.normalArr;
      var ma = objs[i].calculateMatrix(this.m4);
      ma = this.m4.multiply(this.camera.matrixBuffer, ma);

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
      size = 4;
      type = this.gl.UNSIGNED_BYTE;
      normalize = true;
      stride = 0;
      offset = 0;
      this.gl.vertexAttribPointer(this.colorLocation, size, type, normalize, stride, offset);

      this.gl.uniformMatrix4fv(this.matrixLocation, false, ma);

      var primitiveType = this.gl.POINTS;
      offset = 0;
      var count = va.length / 3;
      this.gl.drawArrays(primitiveType, offset, count);
    }
  };
}

log("GLLib loaded.");