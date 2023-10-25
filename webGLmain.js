log("Main loaded.");

function resizeCanvas() {
  var canvas = document.getElementById("webGLCanvas");
  var viewportWidth = document.documentElement.clientWidth;
  var viewportHeight = document.documentElement.clientHeight;
  canvas.width = viewportWidth;
  canvas.height = viewportHeight;
}
resizeCanvas();

window.addEventListener('resize', resizeCanvas);

var gll = new GLLib();

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

scene.render();