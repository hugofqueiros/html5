/**
 * Created by hfq on 17/01/16.
 */
'use strict';

var Config = require('../config/config');

var Native = window.Intl;
var locale = Config.locale;
var numeral = require('numeral');

function Intl() {
	this.native = true;
	this.featureTest();
}

module.exports = Intl;

Intl.prototype.number = function(n) {
	if (this.native) {
		return this.numberFormatter.format(n);
	} else {
		return numeral(n).format();
	}
};

Intl.prototype.currency = function(n) {
	if (this.native) {
		return this.currencyFormatter.format(n);
	} else {
		return numeral(n).format('$0,0.00');
	}
};

Intl.prototype.percentage = function(n) {
	if (this.native) {
		return this.percentFormatter.format(n);
	} else {
		return (n * 100).toFixed(1) + '%';
	}
};

Intl.prototype.featureTest = function() {
	if (!Native) {
		this.native = false;
	} else {
		this.numberFormatter = new Native.NumberFormat(locale);
		this.currencyFormatter = new Native.NumberFormat(locale,
			{
				style: 'currency',
				currency: 'EUR'
			});
		this.percentFormatter = new Native.NumberFormat(locale,
			{
				style: 'percent',
				maximumFractionDigits: 1
			});
	}
};

