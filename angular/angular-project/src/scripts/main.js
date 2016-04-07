import utils from './utils';

console.warn('Hello World!', utils);

if (!utils.isDeviceMobile()) {
    console.warn('not mobile');
}
else {
    console.warn('mobile device');
}
