//mean
//variance
//standart deviation

var scores = [85, 82, 88, 86, 85, 93, 98, 40, 73, 83];
var sum = 0;
scores.forEach(function(s) {
    sum += s;
});
console.log(sum);

//mean
var M = sum / scores.length;
console.log(M);

//variance
var squareSum = 0;
scores.forEach(function(s) {
    squareSum += Math.pow(s - M, 2);
});
console.log(squareSum);

//standart deviation
var G = Math.sqrt(squareSum / scores.length);
console.log(G);
