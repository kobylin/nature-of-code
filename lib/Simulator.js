function Simulator() {
    this.stepDuration = 5;
}

Simulator.prototype = _.extend({
    start: function() {
        var prevTime = new Date();
        var self = this;
        setInterval(function() {
            var time = new Date();
            self.step({
                time: time,
                dt: (time.getTime() - prevTime.getTime())
            });
            prevTime = time;
        }, this.stepDuration);
    },
    step: function(e) {
        this.fireEvent('step', this, e);
    }
}, Observable);