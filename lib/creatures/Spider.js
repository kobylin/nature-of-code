function Spider(options) {
    options = options || {};
    this.position = options.position || new Vector2();
    this.world = options.world;
    this.direction = new Vector2();
    this.speed = 10;
    this.r = 10;

    this.satisfyedNeeds = {
        sleep: 1,
        food: 1,
        life: 1
    };

    this.needsDecrease = {
        sleep: 0.1,
        food: 0.2,
        life: 0.01
    };
}

Spider.prototype = {
    getSpeed: function() {
        return this.speed;
    },

    update: function(e, viewport) {
        this.updateNeeds(e);
        this.updateDirection(e);
    },

    updateNeeds: function(e) {
        for (var need in this.satisfyedNeeds) {
            if (this.satisfyedNeeds[need] > 0) {
                this.satisfyedNeeds[need] -= this.needsDecrease[need] * e.dt / 1000;
            } else {
                this.satisfyedNeeds['life'] -= this.needsDecrease['life'] * e.dt / 1000;
            }
        }
        //console.log('needs', this.satisfyedNeeds);
        logger.print('needs: ' + JSON.stringify(this.satisfyedNeeds));
    },

    updateDirection: function(e) {
        var _this = this;
        var aims = this.world.getCreaturesOfType(Musca);
        var costs = [];

        aims.forEach(function(aim) {
            costs.push(_this.getCost(aim));
        });

        var min = _u.min(costs);
        var bestAim = aims[costs.indexOf(min)];

        var dir = bestAim.position.substract(this.position).normalize();
        this.position = this.position.add(dir.mult(this.speed * e.dt / 1000));
    },

    getCost: function(aim) {
        var distance = this.position.substract(aim.position).mag();
        return distance;
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
    }

}
