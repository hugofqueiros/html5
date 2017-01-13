
/**
  Given an array, , of  integers, calculate and print the the respective mean, median, and mode
  on separate lines. If your array contains more than one modal value, choose the numerically smallest one.
*/
function processData(input) {
    //Enter your code here
    var countNum = input.split("\n");
    var arrayNum = countNum[1].split(" ");

    var mean = 0;
    var medium = 0;
    var mode = 0;

    for (var i = 0; i < parseInt(countNum[0], 10); i++) {
        mean += (parseInt(arrayNum[i], 10) / countNum[0]) ;
    }

    mean = Math.round(mean * 10) / 10;

    //console.log('Mean: ', mean);

    var arrayMedium = arrayNum.sort(function(a, b) {
        return a - b;
    });
    var half = Math.floor(arrayMedium.length/2);

    if (half.length % 2) {
        medium = parseInt(arrayMedium[half], 10);
    } else {
        medium = Math.round((( parseInt(arrayMedium[half-1], 10) + parseInt(arrayMedium[half], 10)) / 2) * 10) / 10;
    }

    //console.log('Medium', medium);

    var max = 1;
    var mode = arrayNum[0];
    var obj = {
        count: 0,
        mode: 0
    }

    for (var i = 0; i < arrayNum.length; i++) {
        for (var k = 0; k < arrayNum.length; k++) {
            if (i !== k && arrayNum[i] === arrayNum[k]) {
                //mode = arrayNum[k];
                max++;
                if (max > obj.count) {
                    obj.count = max;
                    obj.mode = arrayNum[k];
                    mode = arrayNum[k];
                }
            }
        }
        max = 1;
    }



    //console.log('Mode: ', mode);

    console.log(mean);
    console.log(medium);
    console.log(mode);
}

console.log(processData('10\n' + '64630 11735 14216 99233 14470 4978 73429 38120 51135 67060'))
