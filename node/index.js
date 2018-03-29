const cluster = require('cluster');

console.log('cluster.isMaster: ', cluster.isMaster);

// is the file being executed in marter mode?
if (cluster.isMaster) {
    // Cause index.js to be executed *again* but in child mode
    cluster.fork();
} else {
    // I'm a child I am going to act like a server and do nothing else
    const express = require('express');
    const app = express();

    // use the most of the cpu power
    // server is blocked of doing anything else
    function doWork(duration) {
        const start = Date.now();

        while(Date.now() - start < duration) {}
    }
}

app.get('/', (req, res) => {
    doWork(5000); // run inside the event loop - and it can't do anything else
    res.send('Hi there');
});

app.listen(3000);
