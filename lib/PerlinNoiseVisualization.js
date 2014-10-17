function PerlinNoiseVisualization() {
    this.perlin = new SimplexNoise();
    this.perlinPosition = new Vector2();
    this.delta = 0.001;
    //this.delta = 1;
    this.r = 1;
}

PerlinNoiseVisualization.prototype = {
    update: function(e, viewport) {
        this.perlinPosition.x += this.delta;
        this.perlinPosition.y += this.delta;
    },

    draw: function(e, viewport) {
        var x = this.perlin.noise(this.perlinPosition.x, 0);
        var y = this.perlin.noise(this.perlinPosition.y, 0);

        var point = new Vector2(
            Math.mapTo(x, -1, 1, 0, viewport.getWidth()),
            Math.mapTo(y, -1, 1, 0, viewport.getHeight())
        );

        var gPoint = viewport.pointToGlobal(point);
        var gPp = viewport.pointToGlobal(this.perlinPosition);

        var ctx = viewport.getCtx();
        ctx.beginPath();
        ctx.arc(gPp.x* 200, gPoint.y + viewport.getHeight() / 2, this.r, 0, Math.PI * 2);
        ctx.fill();
    },

};
