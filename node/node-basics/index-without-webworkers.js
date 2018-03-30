process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

console.log('cluster.isMaster: ', cluster.isMaster);

// is the file being executed in marter mode?
if (cluster.isMaster) {
    // Cause index.js to be executed *again* but in child mode
    cluster.fork(); // if you add just one it will wait the same amount of time (5s)
    cluster.fork();
    //cluster.fork();
    //cluster.fork();
    //cluster.fork();
    //cluster.fork();
} else {
    // I'm a child I am going to act like a server and do nothing else
    const express = require('express');
    const app = express();
    const crypto = require('crypto');

    // use the most of the cpu power
    // server is blocked of doing anything else
    function doWork(duration) {
        const start = Date.now();

        while(Date.now() - start < duration) {}
    }

    app.get('/', (req, res) => {
        // doWork(5000); // run inside the event loop - and it can't do anything else
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hi there');
        });
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast!') // bc it has other instance so it replies fast than the / with the doWork
    });

    app.listen(3000);
}


