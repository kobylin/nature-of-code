Math.randomGaussian = function() {
    var x1, x2, rad, y1;
    do {
        x1 = 2 * this.random() - 1;
        x2 = 2 * this.random() - 1;
        rad = x1 * x1 + x2 * x2;
    } while (rad >= 1 || rad == 0);
    var c = this.sqrt(-2 * Math.log(rad) / rad);
    return (x1 * c) / 8;
};

Math.randomMonteCarlo = function() {
    while (true) {
        var r1 = Math.random();
        var r2 = Math.random();
        if (Math.pow(r1, 2) > r2) {
            return r1;
        }
    }
};

Math.mapTo = function(value, currMin, currMax, newMin, newMax) {
    return newMin + (newMax - newMin) * ((value - currMin) / (currMax - currMin));
};

_ = {};

_.extend = function(toExtend, extender) {
    for (var property in extender) {
        toExtend[property] = extender[property];
    }

    return toExtend;
};

_.each = function(collection, fn) {
    if (_.is('Object', collection)) {
        for (var key in collection) {
            fn.call(collection, key, collection[key]);
        }
    } else {
        collection.forEach(fn);
    }

};

_.is = function(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
};

_.roundNumber = function(number, digits) {
    var multiple = Math.pow(10, digits);
    var rndedNum = Math.round(number * multiple) / multiple;
    return rndedNum;
};
