_ = {};

_.extend = function(toExtend, extender) {
    var toExtend = arguments[0];
    var extenders = Array.prototype.slice.call(arguments, 1);
    _.each(extenders, function(ex) {
        for (var property in ex) {
            toExtend[property] = ex[property];
        }
    });

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
