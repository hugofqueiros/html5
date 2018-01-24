import Pace from 'pace-progress';

Pace.start();

Pace.once('hide', () => {
    window.prerenderReady = true;
});
