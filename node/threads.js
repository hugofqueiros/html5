process.env.UV_THREADPOOL_SIZE = 2;

const crypto = require('crypto');

const start = Date.now();

// functions are executed at the same time
// with 2 (1072) the executing is similar with 1 (1071) - took 1s to get to the callback
// if it was single threaded it should be 2s
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('1: ', Date.now() - start); // takes +-1071 (1s)
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('2: ', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('3: ', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('4: ', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('5: ', Date.now() - start);
});
