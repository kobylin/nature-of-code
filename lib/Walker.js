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
        this.x = Math.mapTo(x, -1, 1, 0, viewport.width);
        this.y = Math.mapTo(x, -1, 1, 0, viewport.height);
        this.dx += 0.01;
        this.dy += 0.01;
    },

    randomMove: function() {
        var rand = Math.random();

        if (rand < 0.25) {
            this.x++;
        } else if (rand < 0.5) {
            this.x--;
        } else if (rand < 0.75) {
            this.y++;
        } else {
            this.y--;
        }
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

        this.x += Math.random() > .5 ? toMouse.x : availX[Math.random() > .5 ? 0 : 1];
        this.y += Math.random() > .5 ? toMouse.y : availY[Math.random() > .5 ? 0 : 1];
    },

    update: function(e, viewport) {
        this.mouseDirMove(viewport.mouse);
    },

    draw: function(viewport) {
        var ctx = viewport.getCtx();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
};
