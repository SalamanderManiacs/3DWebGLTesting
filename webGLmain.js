log("Main loaded.");

function resizeCanvas() {
  var canvas = document.getElementById("webGLCanvas");
  const {width, height} = canvas.getBoundingClientRect();
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();

window.addEventListener('resize', function() {resizeCanvas();});


var gll = new GLLib();

var scene = new gll.scene();
scene.bindGLL(gll);
var canvas = document.getElementById("webGLCanvas");
scene.bindCanvas(canvas);
scene.prep();

var camera = new gll.camera({
  position: [0,0,100],
  fov: gll.rad(90),
  near: 0.1
});
scene.setCamera(camera);

var sphereMesh = gll.sphereMesh3D(gll, {
  color : [10,135,200],
  lon : 7,
  lat : 7
})


var obj1 = new gll.object({
  mesh: sphereMesh,
  id: "obj1",
  position: [0,0,-50],
  scale: [25,25,25]
});

scene.addObject(obj1);



function update(dt) {
  obj1.rotate([gll.rad(120/1000*dt),gll.rad(35/1000*dt),gll.rad(70/1000*dt)]);
}



let previousTime = 0.0;
const loop = time => {
  const dt = time - previousTime;
  previousTime = time;
  update(dt);
  scene.render();
  window.requestAnimationFrame(loop);
};
window.requestAnimationFrame(time => {
  previousTime = time;
  window.requestAnimationFrame(loop);
});