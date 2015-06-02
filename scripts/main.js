var a = require('./a');
var b = require('./b');
var c = require('./c');
var time = require('./time');

$(document).ready(function($) {
	console.log(a.a);
	b();
	c();
});

// var unique = require('uniq');

// var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

// console.log(unique(data));