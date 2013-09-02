var gravity = new Vector2(0, 9.8);
var heliumForce = new Vector2(0, -9.9);

function HeliumBall(options){
    Mover.call(this, options);
    
    this.mass = options.mass || 10;
    this.netForce = new Vector2();

    this.applyForce(gravity);
    this.applyForce(heliumForce);
}

HeliumBall.prototype = _.extend({}, Mover.prototype, {
    getAcceleration: function(){
        return this.netForce.div(this.mass);
    },

    update: function(e, viewport) {
        var windForce = new Vector2(Math.mapTo(this.perlin.noise(this.dx, 0), -1, 1, -0.001, 0.001), 0);
        this.applyForce(windForce);

        this.acceleration = this.netForce;
        this.applyAcceleration(e);
        this.dx += 0.001;
        this.dy += 0.001;
    },

    applyForce: function(force) {
        this.netForce = this.netForce.add(force);
    }

});
