/**
A non-empty zero-indexed array A consisting of N integers is given. The array contains an odd number of elements,
and each element of the array can be paired with another element that has the same value,
except for one element that is left unpaired.
given an array A consisting of N integers fulfilling the above conditions, returns the value of the unpaired element.

*/

export const solution = (A) => {
    let result;
    for(let i = 0; i < A.length; i++) {
        result ^= A[i]; // exclusive or
    }
    return result;
}


/**
By applying the XOR function of the running result to every element in the array,
the binary versions of these integers end up "cancelling each other out" because
the first XOR flips certain bits, and by applying XOR again with the same integer
later on, you end up flipping them back. What you are left with is the one integer
that never cancelled itself out.
*/
const A = [9, 3, 9, 3, 9, 7, 9];

console.log('Odd Occurrences In Array Solution: ', solution(A));
