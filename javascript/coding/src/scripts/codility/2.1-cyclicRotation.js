/**
A zero-indexed array A consisting of N integers is given.
Rotation of the array means that each element is shifted right
by one index, and the last element of the array is also moved to the first place.

given a zero-indexed array A consisting of N integers and an integer K, returns the
 array A rotated K times.
*/

export const solution = (A, K) => {
    if(A.length === 1 || A.length === 0 || K === 0) {
        return A;
    }

    // if K >= A.length
    K = K % A.length;

    const len = A.length;
    const first = A.slice(0, A.length - K);
    //const second = (A.slice(A.length - K, A.length)).reverse();
    const second = A.slice(A.length - K, A.length);
    const result = second.concat(first);

    // or
    // let part = A.slice(A.length - K);
    // return part.concat(A);

    //console.log('num', first, second, result);

    return result;
};

const A = [1, 1, 2, 3, 5]; //[3, 8, 9, 7, 6];
const K = 2;
console.log('Cyclic Rotation solution', solution(A, K));
