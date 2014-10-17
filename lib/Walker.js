function Walker(options) {
    this.simulator = null;
    this.position = {
        x: options.x || 0,
        y: options.y || 0
    }
    this.r = 1;
    this.perlin = new SimplexNoise();
    this.dx = 0;
    this.dy = 1000;
}

Walker.prototype = {
    perlinMove: function(viewport) {
        var x = this.perlin.noise(this.dx, 0),
            y = this.perlin.noise(this.dy, 0);
        this.dx += 0.01;
        this.dy += 0.01;

        var move = new Vector2(
            //Math.mapTo(x, -1, 1, 0, viewport.getWidth()),
            //Math.mapTo(x, -1, 1, 0, viewport.getHeight())
            Math.mapTo(x, -1, 1, 0, 1),
            Math.mapTo(y, -1, 1, 0, 1)
        );

        return move;
    },

    randomMove: function() {
        var move = new Vector2();

        var rand = Math.random();
        if (rand < 0.25) {
            move.x++;
        } else if (rand < 0.5) {
            move.x--;
        } else if (rand < 0.75) {
            move.y++;
        } else {
            move.y--;
        }

        return move;
    },

    randomGaussianMove: function() {
        var rand = Math.randomGaussian() + 1;
        var move = this.randomMove();

        return move.mult(rand);
    },

    randomMonteCarloMove: function() {
        var rand = Math.randomMonteCarlo() * 3;
        var move = this.randomMove();

        return move.mult(rand);
    },

    mouseDirMove: function(mouse) {
        var dx = (mouse.x - this.position.x);
        var dy = (mouse.y - this.position.y);
        var toMouse = {
            x: dx === 0 ? 0 : (dx > 0 ? 1 : -1),
            y: dy === 0 ? 0 : (dy > 0 ? 1 : -1)
        };

        var availX = [-1, 0, 1],
            availY = [-1, 0, 1];

        availX.splice(availX.indexOf(toMouse.x), 1);
        availY.splice(availY.indexOf(toMouse.y), 1);

        var move = {
            x: Math.random() > .5 ? toMouse.x : availX[Math.random() > .5 ? 0 : 1],
            y: Math.random() > .5 ? toMouse.y : availY[Math.random() > .5 ? 0 : 1]
        };

        return move;
    },

    update: function(e, viewport) {
        //var move = this.mouseDirMove(viewport.mouse);
        //var move = this.randomGaussianMove();
        //var move = this.randomMonteCarloMove();
        //var move = this.randomMove();
        var move = this.perlinMove(viewport);

        this.position.x += move.x;
        this.position.y += move.y;
    },

    draw: function(e, viewport) {
        var ctx = viewport.getCtx();
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
};
