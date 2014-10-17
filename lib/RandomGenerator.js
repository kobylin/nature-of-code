var RandomGenerator = {
    get: function(val) {
        var x = (val << 13) ^ val;
        var rand = (1.0 - ((x * (x * x * 15731 + 789221) + 1376312589) & 2147483647) / 1073741824);

        return rand;
    }
};
