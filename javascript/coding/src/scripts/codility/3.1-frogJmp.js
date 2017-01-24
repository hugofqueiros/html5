/**
 * A small frog wants to get to the other side of the road. The frog is currently located at
 * position X and wants to get to a position greater than or equal to Y. The small frog always
 * jumps a fixed distance, D.

 Count the minimal number of jumps that the small frog must perform to reach its target.

 given three integers X, Y and D, returns the minimal number of jumps from position X to a
 position equal to or greater than Y.
 * @param X
 * @param Y
 * @param D
 */
const solution = (X, Y, D) => {
    if (X === Y) {
        return 0;
    }

    return Math.ceil((Y - X) / D);
};

const X = 10;
const Y = 85;
const D = 30;

console.log('Frog Jmp solution', solution(X, Y, D));
