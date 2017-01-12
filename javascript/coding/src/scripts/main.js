import utils from './utils';

if (!utils.isDeviceMobile()) {
    console.warn('not mobile');
}
else {
    console.warn('mobile device');
}
