function Palette() {
    this.numColors = 10;
    this.colors = [];
    this.dt = 100;
    this.dC = this.dt;
    this.getRandom = function() {
        return Math.randomMonteCarlo();
        return (Math.randomGaussian() + 1) / 2;
    };
}

Palette.prototype = {

    update: function(e) {
        if (this.dC > 0) {
            this.dC -= e.dt;
            return;
        }
        this.dC = this.dt;

        this.colors = [];
        for (var i = 0; i < this.numColors; i++) {
            var rand = this.getRandom(),
                r = Math.round(255 * this.getRandom()),
                g = Math.round(255 * this.getRandom()),
                b = Math.round(255 * this.getRandom());
            g = 0;
//            r = 0;
            this.colors.push('rgb(' + r + ',' + g + ',' + b + ')');
        }
    },

    draw: function(viewport) {
        var ctx = viewport.getCtx(),
            colorCellWidth = viewport.width / this.numColors,
            colorCellHeight = viewport.height;

        for (var i = 0; i < this.numColors; i++) {
            ctx.fillStyle = this.colors[i];
            ctx.fillRect(i * colorCellWidth, 0, colorCellWidth, colorCellHeight);
        }
    }

};


