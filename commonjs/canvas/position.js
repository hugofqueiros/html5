/**
 * Created by hfq on 30-07-2015.
 */

'use strict';

module.exports = {

    /**
     * @param point
     * @param screenWidth
     * @param screenHeight
     * @param realWidth
     * @param realHeight
     * @returns {*[]}
     */
    pointInPixelToMeters: function (point, screenWidth, screenHeight, realWidth, realHeight) {
        var x = point[0] * realWidth / screenWidth;
        var y = (screenHeight - point[1]) * realHeight / screenHeight;

        return [x, y];
    },

    /**
     * @param point
     * @param canvasWidth
     * @param canvasHeight
     * @param realWidth
     * @param realHeight
     * @returns {*[]}
     */
    pointMetersToPixel: function (point, canvasWidth, canvasHeight, realWidth, realHeight) {
        var x = point[0] * canvasWidth / realWidth,
            y = (realHeight - point[1]) * canvasHeight / realHeight;

        return [Math.round(x), Math.round(y)];
    },

    /**
     * @param point
     * @param canvas
     * @param model
     * @returns {{x: number, y: number}}
     */
    canvasP2M: function (point, canvas, model) {
        var canvasWidth = canvas.getWidth(),
            canvasHeight = canvas.getHeight(),
            realWidth = model.get('width'),
            realHeight = model.get('height'),
            x = point[0] * realWidth / canvasWidth,
            y = (canvasHeight - point[1]) * realHeight / canvasHeight;

        return {x: x, y: y};
    },

    /**
     * Convert meters to pixels for canvas
     * @param point
     * @param canvas
     * @param model
     * @returns {{x: number, y: number}}
     */
    canvasM2P: function (point, canvas, model) {
        var canvasWidth = canvas.getWidth(),
            canvasHeight = canvas.getHeight(),
            realWidth = model.get('width'),
            realHeight = model.get('height'),
            x = point[0] * canvasWidth / realWidth,
            y = (realHeight - point[1]) * canvasHeight / realHeight;

        return {x: Math.round(x), y: Math.round(y)};
    }
};
