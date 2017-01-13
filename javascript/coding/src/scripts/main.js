import utils from './utils';

import codility from './codility/codility';

if (!utils.isDeviceMobile()) {
    console.warn('not mobile');
}
else {
    console.warn('mobile device');
}
