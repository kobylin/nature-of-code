var canvas = document.getElementById('screen');
console.log(canvas);
var simulator = new Simulator({
    canvas: canvas
});
simulator.addObject(new Walker({
    x: canvas.width / 2,
    y: canvas.height / 2
}));
simulator.start();
