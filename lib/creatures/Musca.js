function Musca(options) {
    options = options || {};
    this.position = options.position || new Vector2();
    this.r = 3;

    this.xRandomizer = SimplexNoise.create1DWithStep(0.001);
    this.yRandomizer = SimplexNoise.create1DWithStep(0.001);
}

Musca.prototype = {
    update: function(e, viewport) {
        var move = this.randomMove();
        this.position = this.position.add(move);
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

        this.prevPosition = this.position;
    },

    randomMove: function(){
        return new Vector2(
            this.xRandomizer(),        
            this.yRandomizer()
        );
    }
};
