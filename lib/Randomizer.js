/**
 * Created with JetBrains WebStorm.
 * User: andrew
 * Date: 8/1/13
 * Time: 5:09 PM
 * To change this template use File | Settings | File Templates.
 */
function Randomizer() {
    this.numbers = {};
    this.min = 0;
    this.max = 1;
    this.getRandom = function() {
        return Math.randomMonteCarlo();
        return Math.randomGaussian();
    };
}

Randomizer.prototype = {
    update: function(e, viewport) {
        var number = _.roundNumber(this.getRandom(), 2);
        if (!this.numbers[number]) {
            this.numbers[number] = 0;
        }
        this.numbers[number]++;
    },

    draw: function(viewport) {
        var ctx = viewport.getCtx();
        var ratio = viewport.width / (this.max - this.min);
        var shift = this.min * ratio;

        _.each(this.numbers, function(number, count) {
            var x = number * ratio - shift;
            var y = count;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, y);
            ctx.stroke();
        });

    }

};