/**
 *
 A non-empty zero-indexed array A consisting of N integers is given. Array A represents numbers on a tape.
 Any integer P, such that 0 < P < N, splits this tape into two non-empty parts: A[0], A[1], ..., A[P − 1] and A[P], A[P + 1], ..., A[N − 1].
 The difference between the two parts is the value of: |(A[0] + A[1] + ... + A[P − 1]) − (A[P] + A[P + 1] + ... + A[N − 1])|
 In other words, it is the absolute difference between the sum of the first part and the sum of the second part.
 * @param A
 */
const solution = (A) => {
    const len = A.length - 1;
    let min = 0;

    if (len === 0) {
        return min;
    }

    let lower = [];
    let upper = [];

    for (let i = 1; i <= len; i++) {
        lower = A.slice(0, i);
        upper = A.slice(i, len + 1);

        let lowerSum = lower.reduce((a, b) =>{
            return a + b;
        });

        let upperSum = upper.reduce((a, b) => {
            return a + b;
        });

        const diff = Math.abs(lowerSum - upperSum);
        if (min === 0 || diff < min) {
            min = diff;
        }
    }

    return min;
};

const A = [3, 1, 2, 4, 3];

console.log('Tape Equilibrium', solution(A));
