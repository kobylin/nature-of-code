function Simulator(options) {
    this.stepDuration = 20;
}

Simulator.prototype = _u.extend({}, {
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
