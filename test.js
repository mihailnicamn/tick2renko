const renko = require('./index.js');
var time = 100;//milliseconds

const random = (last_val) => {
    //get 1 and -1 randomly
    var sign = Math.random() > 0.5 ? 1 : -1;
    return parseFloat(last_val) + sign;
}
var value = 100;
const data = new renko();
data.setBrickSize(10);

//create array of random values
var arr = [];
for (var i = 0; i < 10000; i++) {
    value = random(value);
    arr.push(value);
}
data.loadTicksHistory(arr);
console.log(data._bricks);