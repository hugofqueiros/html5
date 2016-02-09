/**
 * Created by hfq on 1/02/16.
 */
console.log('CENAS');

function solution(A) {
	console.log('Dentro solution', A);
}

(function() {
	solution('punani');
	console.log('muito coco');
})();

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solutionBinaryGap(N) {
	// write your code in JavaScript (Node.js 4.0.0)
	var max = 0;
	var count = -1;
	var r = 0;

	// console.log('cenas', (N >>> 0).toString(2));

	while (N > 0) {
		r = N & 1;
		N = N >> 1;

		if (r == 0 && count >= 0) {
			count++;
		}

		if (r === 1) {
			max = count > max ? count : max;
			count = 0;
		}
	}

	return max;
}

var test1 = 1041;
var test2 = 15;

console.log('test1', solutionBinaryGap(test1));
console.log('test2', solutionBinaryGap(test2));

var testtask1 = 24;

console.log('task1', solutionTask1(testtask1));
function solutionTask1(N) {
	// write your code in JavaScript (Node.js 4.0.0)
	var number = Math.abs(N);
	var power = 0;
	var divider = Math.pow(2, power);
	var sol = -1;

	function isInt(num) {
		return num % 1 === 0;
	}

	while(divider < number) {
		var value = number / divider;
		//console.log('value', number, divider, value);

		//console.log('isInt', isInt(value));

		if(isInt(value)) {
			sol = power;
		}
		power++;
		divider = Math.pow(2, power);
	}

	return sol;
}

var testtaskt2_1 = 'form';
var testtaskt2_2 = 'from';

console.log('task2', solutionTask2(testtaskt2_1, testtaskt2_2));

function solutionTask2(S, T) {
	var sol = 0;
	return sol;
}