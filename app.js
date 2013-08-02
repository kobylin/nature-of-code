var canvas = document.getElementById('screen'),
    viewport = new Viewport(canvas);

var simulator = new Simulator();
var walker = new Walker({
    x: viewport.width / 2,
    y: viewport.height / 2
});
var randomizer = new Randomizer();
simulator.on('step', function(simulator, e) {
    randomizer.update(e, viewport);
    randomizer.draw(viewport);
//    walker.update(e, viewport);
//    walker.draw(viewport);
});
simulator.start();
