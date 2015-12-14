/**
 * Created by hfq on 14/12/15.
 */

'use strict';

var path = require('path');
var DIST = 'dist';

var dist = function(subpath) {
  return !subpath ? DIST : path.join(DIST, subpath);
};

module.exports = dist;
