// I'm a child I am going to act like a server and do nothing else
const express = require('express');
const app = express();
const crypto = require('crypto');
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
    // the worker part
    const worker = new Worker(function() {
        this.onmessage = function() {
            let counter = 0;
            while (counter < 1e9) {
                counter++;
            }

            postMessage(counter);
        };
    });

    // the app part
    worker.onmessage = function(message) {
        console.log(message.data);
        res.send('' + message.data);
    };

    worker.postMessage();
});

app.get('/fast', (req, res) => {
    res.send('This was fast!'); // bc it has other instance so it replies fast than the / with the doWork
});

app.listen(3000);
