import Pace from 'pace-progress';
import 'babel-polyfill';

Pace.start();

Pace.once('hide', () => {
    window.prerenderReady = true;
});
