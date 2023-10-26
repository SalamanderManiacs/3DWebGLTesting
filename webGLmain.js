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
scene.bindGLL(gll);
var canvas = document.getElementById("webGLCanvas");
scene.bindCanvas(canvas);
scene.prep();

var camera = new gll.camera({
  position: [0,0,100],
  fov: 179,
  near: 0.1
});
scene.setCamera(camera);

var rectMesh = gll.rectMesh3D(gll, {
  color : [ 
    [225,60,75],
    [145,230,30],
    [15,200,50],
    [50,15,215],
    [230,15,200],
    [10,135,200]
  ]
})

var obj1 = new gll.object({
  mesh: rectMesh,
  id: "obj1",
  position: [0,0,-50],
  scale: [25,25,25]
});
var obj2 = new gll.object({
  mesh: rectMesh,
  id: "obj2",
  position: [-150,0,-50],
  scale: [25,25,25]
});
var obj3 = new gll.object({
  mesh: rectMesh,
  id: "obj3",
  position: [150,0,-50],
  scale: [25,25,25]
});
var obj4 = new gll.object({
  mesh: rectMesh,
  id: "obj4",
  position: [-300,0,-50],
  scale: [25,25,25]
});
var obj5 = new gll.object({
  mesh: rectMesh,
  id: "obj5",
  position: [300,0,-50],
  scale: [25,25,25]
});

scene.addObject(obj1);
scene.addObject(obj2);
scene.addObject(obj3);
scene.addObject(obj4);
scene.addObject(obj5);



function update(dt) {
  obj1.rotate([gll.rad(120/1000*dt),gll.rad(35/1000*dt),gll.rad(70/1000*dt)]);
  obj2.rotate([gll.rad(70/1000*dt),gll.rad(120/1000*dt),gll.rad(35/1000*dt)]);
  obj3.rotate([gll.rad(35/1000*dt),gll.rad(70/1000*dt),gll.rad(120/1000*dt)]);
  obj4.rotate([gll.rad(170/1000*dt),gll.rad(0/1000*dt),gll.rad(35/1000*dt)]);
  obj5.rotate([gll.rad(35/1000*dt),gll.rad(0/1000*dt),gll.rad(170/1000*dt)]);
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