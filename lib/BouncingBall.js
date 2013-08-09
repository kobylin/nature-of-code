function BouncingBall(options) {
    this.p = new Vector2(options.x, options.y);
    this.r = 10;

    var direction = (new Vector2(Math.random(), Math.random())).normalize();
    this.velocity = direction.mult(options.velocity);
}

BouncingBall.prototype = {
    update: function(e, viewport) {
        this.p = this.p.add(this.velocity.mult(e.dt / 1000));
        if (this.p.x > viewport.width || this.p.x < 0) {
            this.velocity.x *= -1;
        }
        if (this.p.y > viewport.height || this.p.y < 0) {
            this.velocity.y *= -1;
        }
    },
    draw: function(viewport) {
        var ctx = viewport.getCtx();
        if (this.prevPosition) {
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(this.prevPosition.x, this.prevPosition.y, this.r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.p.x, this.p.y, this.r, 0, Math.PI * 2);
        ctx.fill();

        this.prevPosition = this.p;
    }
};