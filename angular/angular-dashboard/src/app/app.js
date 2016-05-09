(function(){
    'use strict';

    var hcConfig = {
        global: {
            useUTC: true
        },
        credits:    {
            enabled: false
        },
        chart: {
            zoomType: 'x',
            reflow: true,
            height: 300,
            style: {
                fontFamily: '"Roboto Condensed, Lucida Grande", ' +
                '"Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
                fontSize: '12px'
            },
            events: {
                redraw: function (chart) {
                    setTimeout(function () {
                        chart.target.reflow();
                    }, 0);
                }
            }
        },
        title: {
            text: null,
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: null
        },
        tooltip: {
            animation: true,
            borderRadius: 10,
            borderWidth: 2,
            useHTML: true,
            crosshairs:      {
                width:     1,
                color:     '#2A343C',
                dashStyle: 'ShortDash'
            }
        },
        plotOptions: {
            areaspline: {
                allowPointSelect: true,
                fillOpacity: 0.5,
                enableMouseTracking: true
            },
            line: {
                allowPointSelect: true,
                enableMouseTracking: true
            }
        }
    };

    Highcharts.setOptions(hcConfig);

    angular.module('app', [ 'ngMaterial' ]);

})();
