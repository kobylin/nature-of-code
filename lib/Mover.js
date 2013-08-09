function Mover(options) {
    this.position = options.position || new Vector2(0, 0);
    this.velocity = options.velocity || new Vector2(0, 0);
    this.acceleration = options.acceleration || new Vector2(0, 0);
    this.r = options.r || 3;

    this.perlin = new SimplexNoise();
    this.dx = 0;
    this.dy = 10000;
}

Mover.prototype = {
    randomAcceleration: function() {
        this.acceleration = (new Vector2(this.perlin.noise(this.dx, 0), this.perlin.noise(this.dy, 0))).normalize().mult(0.1);
    },

    keysAcceleration: function(viewport) {
        if (viewport.keyboard.keypressed.UP) {
            this.acceleration = this.acceleration.add(new Vector2(0, -0.01));
        } else if (viewport.keyboard.keypressed.DOWN) {
            this.acceleration = this.acceleration.add(new Vector2(0, 0.01));
        }
    },

    mouseAcceleration: function(viewport) {
        var mouseDir = new Vector2(viewport.mouse.x - this.position.x, viewport.mouse.y - this.position.y);
        this.acceleration = mouseDir.normalize().mult(viewport.getWidth() / mouseDir.mag());
    },

    update: function(e, viewport) {
        this.mouseAcceleration(viewport);
        this.velocity = this.velocity.add(this.acceleration);
        this.position = this.position.add(this.velocity.mult(e.dt / 1000));

        this.dx += 0.001;
        this.dy += 0.001;
    },

    draw: function(e, viewport) {
        var ctx = viewport.getCtx(),
            p;
        if (this.prevPosition) {
            ctx.fillStyle = "white";
            ctx.beginPath();
            p = viewport.pointToGlobal(this.prevPosition);
            ctx.arc(p.x, p.y, this.r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = "black";
        ctx.beginPath();
        p = viewport.pointToGlobal(this.position);
        ctx.arc(p.x, p.y, this.r, 0, Math.PI * 2);
        ctx.fill();


        var accVector = this.position.add(this.acceleration.mult(10));
        var accP = viewport.pointToGlobal(accVector);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(accP.x, accP.y);
        ctx.stroke();

        this.prevPosition = this.position;
    }

};