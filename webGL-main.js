//handle resizes
function resizeCanvas() {
  var canvas = document.getElementById("webGLCanvas");
  var viewportWidth = document.documentElement.clientWidth;
  var viewportHeight = document.documentElement.clientHeight;
  canvas.width = viewportWidth;
  canvas.height = viewportHeight;
  var gl = canvas.getContext("webgl2");
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

function log(output) {
  document.getElementById("output").innerHTML = output;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

import { glLib } from './webGL-lib.js'

var gll = new glLib();

var scene = new gll.scene();
var canvas = document.getElementById("webGLCanvas");
scene.bindCanvas(canvas);
scene.prep();

var obj1 = new gll.object({
  mesh: new gll.mesh([
    new gll.face([
      -0.5, 0.5, 0,
      0.5, 0.5, 0,
      -0.5, -0.5, 0,
    ], {
      color: [225, 25, 25]
    }),
    new gll.face([
      0.5, -0.5, 0,
      -0.5, -0.5, 0,
      0.5, 0.5, 0,
    ], {
      color: [25, 225, 25]
    })
  ]),
  id: "obj1"
})

scene.addObject(obj1);

scene.refreshBuffers();
log(scene.vertexBuffer);
log(scene.colorBuffer)

scene.render();