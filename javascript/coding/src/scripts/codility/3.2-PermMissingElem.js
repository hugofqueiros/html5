/**
 * A zero-indexed array A consisting of N different integers is given. The array contains integers in the range
 * [1..(N + 1)], which means that exactly one element is missing.
 * Your goal is to find that missing element.
 * @param A
 */
const solution = (A) => {

    const arr = A.sort((a, b) => {
        return a - b;
    });

    let i = 0;
    let next = 1;

    while(next === arr[i]) {
        next++;
        i++;
    }

    return next;
};

const A = [2, 3, 1, 5];
console.log('Perm Missing Elem solution: ', solution(A));
