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
        var rand = Math.random();
        //probability of number is success
        var p = Math.pow(rand, 2);
        var qualify = Math.random();
        if (p < qualify) {
            return rand;
        }
    }
};

Math.mapTo = function(value, currMin, currMax, newMin, newMax) {
    return newMin + (newMax - newMin) * ((value - currMin) / (currMax - currMin));
};

