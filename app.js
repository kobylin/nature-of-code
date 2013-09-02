var canvas = document.getElementById('screen'),
    loggerOut = document.getElementById('logger'),
    viewport = new Viewport(canvas, {
        scale: 1
    }),
    logger = new Logger(loggerOut),
    object;

simulator = new Simulator();
//var object = new Walker({
//    x: viewport.width / 2,
//    y: viewport.height / 2
//});
//object = new Randomizer();
//object = new Palette();
//object = new BouncingBall({
//    x: viewport.width / 2,
//    y: viewport.height / 2,
//    velocity: 100
//});
object = new Mover({
    position: new Vector2(viewport.getWidth() / 2, viewport.getHeight() / 2),
    acceleration: new Vector2(0.1, 0.2)
});
//

//object = new HeliumBall({
    //position: new Vector2(viewport.getWidth() / 2 * 10, viewport.getHeight() * 10 ),
//});

simulator.on('step', function(simulator, e) {
    object.update(e, viewport);
    object.draw(e, viewport);
    logger.print('X: ', Math.ceil(object.position.x), 'Y: ', Math.ceil(object.position.y));
});
simulator.start();
