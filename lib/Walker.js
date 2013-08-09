function Walker(options) {
    this.simulator = null;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.r = 1;
    this.perlin = new SimplexNoise();
    this.dx = 0;
    this.dy = 1000;
}

Walker.prototype = {
    perlinMove: function() {
        var x = this.perlin.noise(this.dx, 0),
            y = this.perlin.noise(this.dy, 0);
        this.dx += 0.01;
        this.dy += 0.01;

        var move = {
            x: Math.mapTo(x, -1, 1, 0, viewport.width),
            y: Math.mapTo(x, -1, 1, 0, viewport.height)
        };

        return move;
    },

    randomMove: function() {
        var rand = Math.random();
        var move = {x: 0, y: 0};

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
        var rand = (Math.randomGaussian() + 1 ) / 2;
        var move = this.randomMove();

        move.x *= rand;
        move.y *= rand;

        return move;
    },

    mouseDirMove: function(mouse) {
        var dx = (mouse.x - this.x);
        var dy = (mouse.y - this.y);
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
        var move = this.randomMove();

        this.x += move.x;
        this.y += move.y;
    },

    draw: function(viewport) {
        var ctx = viewport.getCtx();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}
;
