function Vector2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector2.random = function() {
    return new Vector2((0.5 - Math.random()) * 2, (0.5 - Math.random()) * 2);
}

Vector2.prototype = {
    add: function(vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    },
    substract: function(vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    },
    normalize: function() {
        return this.div(this.mag());
    },
    mult: function(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    },
    div: function(scalar) {
        return new Vector2(this.x / scalar, this.y / scalar);
    },
    cross: function(vector) {
        return new Vector2(this.x * vector.x, this.y * vector.y);
    },
    mag: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    limit: function(max) {
        if (this.mag() > max) {
            return this.normalize().mult(max);
        } else {
            return this;
        }
    },

};

function Vector3(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector3.prototype = {
    add: function(vector) {
        return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }
};
