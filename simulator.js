function Simulator(options) {
    this.objects = [];
    this.stepDuration = 20;
    this.screen = options.canvas.getContext('2d');
    this.screen.width = options.canvas.width;
    this.screen.height = options.canvas.height;
    this.mouse = {
        x: null,
        y: null
    };
    var self = this;
    options.canvas.onmousemove = function(e) {
        self.mouse.x = e.clientX;
        self.mouse.y = e.clientY;
    }
}

Simulator.prototype = {
    addObject: function(object) {
        object.simulator = this;
        this.objects.push(object);
    },
    start: function() {
        var prevTime = new Date();
        var self = this;
        setInterval(function() {
            var time = new Date();
            self.step({
                time: time,
                d: (time.getTime() - prevTime.getTime())
            });
            prevTime = time;
        }, this.stepDuration);

    },
    step: function(e) {
        var self = this;
        this.objects.forEach(function(obj) {
            obj.update(e);
            obj.draw({
                screen: self.screen
            });
        });
        //console.log(e.d);
    }
}

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
    moveDir: function() {
        var dir = {
            x: (this.simulator.mouse.x - this.x) / Math.abs(this.simulator.mouse.x - this.x),
            y: (this.simulator.mouse.y - this.y) / Math.abs(this.simulator.mouse.y - this.y),
        };
        dir.x = isNaN(dir.x) ? 0 : dir.x;
        dir.y = isNaN(dir.y) ? 0 : dir.y;
        return dir;
    },
    update: function(e) {
        this.x = this.perlin.noise(this.dx, 0);
        this.y = this.perlin.noise(this.dy, 0);
        this.x = Math.mapTo(this.x, -1, 1, 0, this.simulator.screen.width);
        this.y = Math.mapTo(this.y, -1, 1, 0, this.simulator.screen.height);
        this.dx += 0.01;
        this.dy += 0.01;
        return;

        var steps = [4, 3, 2, 1, 2, 3, 4];
        var index = Math.floor(Math.randomGaussian() * steps.length / 2 + steps.length / 2);
        var step = steps[index];
        while (true) {
            var r1 = Math.random() * 10;
            var p = r1 * r1;
            var r2 = Math.random() * 100;
            if (r2 < p) {
                step = Math.floor(r1);
                break;
            }
        }
        console.log(step);
        var dir = this.moveDir();
        var pxa = 33 + dir.x * 10;
        var pxs = pxa + 33 - dir.x * 10;
        var pya = 33 + dir.y * 10;
        var pys = pya + 33 - dir.y * 10;
        //console.log(p, pxa, pxs);
        var p_x = Math.random() * 100;
        if (0 <= p_x && p_x <= pxa) {
            this.x += step;
        } else if (pxa <= p_x && p_x <= pxs) {
            this.x -= step;
        }

        var p_y = Math.random() * 100;
        if (0 <= p_y && p_y <= pya) {
            this.y += step;
        } else if (pya <= p_y && p_y <= pys) {
            this.y -= step;
        }
    },

    draw: function(e) {
        e.screen.beginPath();
        e.screen.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        e.screen.fill();
    }
}
