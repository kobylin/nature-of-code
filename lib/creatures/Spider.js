function Spider(options) {
    options = options || {};
    this.position = options.position || new Vector2();
    this.world = options.world;
    this.direction = new Vector2();
    this.speed = 20;
    this.r = 10;
    this.defaultColor = 'violet';
    this.color = this.defaultColor;
    this.alive = true;

    this.needs = {
        sleep: {
            value: 1,
            decreaseRate: 0.1,
            satisfying: false,
            color: 'blue'
        },
        food: {
            value: 1,
            decreaseRate: 0.2,
            satisfying: false,
            color: 'red'
        },
        life: {
            value: 1,
            decreaseRate: 0.01,
            satisfying: false,
            color: 'gray'
        }
    };
}

Spider.prototype = {
    getSpeed: function() {
        return this.speed;
    },

    isSatisfyingSmth: function() {
        var satisfyingSmth = false;
        _u.each(this.needs, function(k, n) {
            satisfyingSmth |= n.satisfying;
        });
        return satisfyingSmth;
    },

    update: function(e, viewport) {
        this.tryLife(e);
        if (!this.alive) return;

        this.updateNeeds(e);
        this.updateDirection(e);
        this.tryFood(e);
        this.trySleep(e);
    },

    updateNeeds: function(e) {
        if (this.isSatisfyingSmth()) return;
        for (var needName in this.needs) {
            var need = this.needs[needName];
            if (need.value > 0 && !need.satisfying) {
                need.value -= need.decreaseRate * e.dt / 1000;
            } else {
                this.needs['life'].value -= this.needs['life'].decreaseRate * e.dt / 1000;
            }
        }
        //console.log('needs', this.satisfyedNeeds);
    },

    tryFood: function(e) {
        if (this.isSatisfyingSmth()) return;
        var _this = this;
        var aim = this.getClosestAim();
        if (aim && this.canEat(aim) && this.needs['food'].value < 0.5) {
            this.world.remove(aim);
            this.needs['food'].satisfying = true;
            this.color = this.needs['food'].color;
            setTimeout(function() {
                _this.needs['food'].satisfying = false;
                _this.needs['food'].value = 1;
                _this.color = _this.defaultColor;
            }, 2000);

        }
    },

    trySleep: function() {
        var _this = this;
        if (this.isSatisfyingSmth()) return;
        if (this.needs['sleep'].value <= 0) {
            this.needs['sleep'].satisfying = true;
            this.color = this.needs['sleep'].color;
            setTimeout(function() {
                _this.needs['sleep'].satisfying = false;
                _this.needs['sleep'].value = 1;
                _this.color = _this.defaultColor;
            }, 4000);
        }
    },

    tryLife: function(e) {
        if (this.needs['life'].value < 0) {
            this.color = this.needs['life'].color;
            this.alive = false;
        } else if (this.isSatisfyingSmth()) {
            this.needs['life'].value += this.needs['life'].decreaseRate * e.dt / 1000;
        }
    },

    updateDirection: function(e) {
        if (this.isSatisfyingSmth()) return;
        var aim = this.getClosestAim();
        if (!aim) return;
        var dir = aim.position.substract(this.position).normalize();
        this.position = this.position.add(dir.mult(this.speed * e.dt / 1000));
    },

    getClosestAim: function() {
        var _this = this;
        var aims = this.world.getCreaturesOfType(Musca);
        if (aims.length === 0) return null;

        var costs = [];

        aims.forEach(function(aim) {
            costs.push(_this.getCost(aim));
        });

        var min = _u.min(costs);
        var bestAim = aims[costs.indexOf(min)];

        return bestAim;
    },

    getCost: function(aim) {
        var distance = this.position.substract(aim.position).mag();
        return distance;
    },

    canEat: function(aim) {
        var distance = this.position.substract(aim.position).mag();
        return distance < 20;
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
        ctx.fillStyle = this.color;
        ctx.beginPath();
        p = viewport.pointToGlobal(this.position);
        ctx.arc(p.x, p.y, this.r, 0, Math.PI * 2);
        ctx.fill();

        this.prevPosition = this.position;

        logger.print('needs: ' + JSON.stringify(this.needs, null, 2));
    }

}
