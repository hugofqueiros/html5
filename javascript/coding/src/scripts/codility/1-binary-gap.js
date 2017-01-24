/**
A binary gap within a positive integer N is any maximal sequence of consecutive
zeros that is surrounded by ones at both ends in the binary representation of N.

For example, number 9 has binary representation 1001 and contains a binary gap
of length 2. The number 529 has binary representation 1000010001 and contains
two binary gaps: one of length 4 and one of length 3. The number 20 has binary
representation 10100 and contains one binary gap of length 1.
The number 15 has binary representation 1111 and has no binary gaps.
*/

export const solution = (N) => {
    let num = N;
    let max = 0;
    let counter = -1;
    let binaryNum = '';

    while(num > 0) {
        var digit = num % 2;
        if(digit === 1) {
            if (counter > max) {
                max = counter;
            }
            counter = 0;
        } else if (counter >= 0) {
            counter++;
        }

        binaryNum = '' + digit + binaryNum;
        num = parseInt(num / 2);
    }

    // console.log('num, binary: ', N, binaryNum)

    return max;
}

console.log('Binary Gap Solution : ', solution(1041));
