var Random = {
    basedOnPrime: function() {
        return function(t) {
            x = (t << 13) ^ t;
            return (1.0 - ((x * (x * x * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0);
        };
    },
    basedOnSin: function(seed) {
        var seed = seed || 10;
        return function(t) {
            var x = Math.sin(seed + t) * 10000;
            return x - Math.floor(x);
        }

    }

};
