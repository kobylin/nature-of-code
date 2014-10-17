_u = {};

_u.extend = function(toExtend, extender) {
    var toExtend = arguments[0];
    var extenders = Array.prototype.slice.call(arguments, 1);
    _u.each(extenders, function(ex) {
        for (var property in ex) {
            toExtend[property] = ex[property];
        }
    });

    return toExtend;
};

_u.each = function(collection, fn) {
    if (_u.is('Object', collection)) {
        for (var key in collection) {
            fn.call(collection, key, collection[key]);
        }
    } else {
        collection.forEach(fn);
    }

};

_u.is = function(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
};

_u.roundNumber = function(number, digits) {
    var multiple = Math.pow(10, digits);
    var rndedNum = Math.round(number * multiple) / multiple;
    return rndedNum;
};

_u.min = function(arr) {
    var min = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
};
