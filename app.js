(function() {
    var canvas = document.getElementById('screen'),
        loggerOut = document.getElementById('logger'),
        viewport = new Viewport(canvas, {
            scale: 2
        }),
        object;
    logger = new Logger(loggerOut);

    var simulator = new Simulator();
    var world = new World();
    world.creatures.push(new Musca({
        position: new Vector2(viewport.getWidth() * Math.random(), viewport.getHeight() * Math.random()),
        world: world
    }));
    world.creatures.push(new Musca({
        position: new Vector2(viewport.getWidth() * Math.random(), viewport.getHeight() * Math.random()),
        world: world
    }));
    world.creatures.push(new Spider({
        position: new Vector2(100, 100),
        world: world
    }));
    //var object = new Walker({
    //x: viewport.getWidth() / 2,
    //y: viewport.getHeight() / 2
    //});
    //var object = new PerlinNoiseVisualization();
    //object = new Randomizer();
    //object = new Palette();
    //object = new BouncingBall({
    //    x: viewport.width / 2,
    //    y: viewport.height / 2,
    //    velocity: 100
    //});
    //object = new Mover({
    //position: new Vector2(viewport.getWidth() / 2, viewport.getHeight() / 2),
    //acceleration: new Vector2(0.1, 0.2)
    //});
    //

    //object = new HeliumBall({
    //position: new Vector2(viewport.getWidth() / 2 * 10, viewport.getHeight() * 10 ),
    //});
    //
    //var object = new Spider();

    simulator.on('step', function(simulator, e) {
        //object.update(e, viewport);
        //object.draw(e, viewport);
        world.update(e, viewport);
        world.draw(e, viewport);
        //logger.print('X: ', Math.ceil(object.position.x), 'Y: ', Math.ceil(object.position.y));
    });
    simulator.start();


    //for (var t = 0; t <= 100; t++) {
    //console.log(t, RandomGenerator.get(t));
    //}

}());
