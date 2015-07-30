/**
 * Created by hfq on 30-07-2015.
 */

'use strict';

/**
 * @param json
 * @param valueIfJSON
 * @param valueIfNotJSON
 * @returns {*}
 */
module.exports = function(json, valueIfJSON, valueIfNotJSON) {
    try {
        json = JSON.parse(json);
    } catch(e) {
        return valueIfNotJSON;
    }
    return typeof valueIfJSON !== 'undefined' ? valueIfJSON : json;
};