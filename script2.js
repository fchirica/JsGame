var n = 6;
var width = 6;
var height = 2;
var ant = -1;
var ok = 0;
var pairs = 0;
var clicks = 0;
var done = false;
var ids = new Array ();
var found = new Array ();
var values = new Array ();


var random = function () {
	var value = Math.floor (n*Math.random ()) + 1;
	while (found [value] == 2) {
		value = Math.floor (n*Math.random ()) + 1;
	}
	found[value]++;
	return value;
}

var flip = function (card) {
	if (ok < 2) {
		clicks++;
		ok++;
		$(ids[card]).css ('background-color', 'white');
		if (ant == -1) {
			ant = card;
		}
		else if (values[ant] == values[card]) {
			pairs++;
			ant = -1;
			ok = 0;
		}
		else {
			setTimeout (function () {
				$(ids[ant]).css ('background-color', 'DarkCyan');
				$(ids[card]).css ('background-color', 'DarkCyan');
				ant = -1;
				ok = 0;
			}, 500);

		}

		if (pairs == n) {
			setTimeout (function () {
				alert ('Congratz!');
				generate ();
			}, 500);
		}

		document.getElementById ('clicks').innerHTML = "Number of clicks: " + String (clicks);
	}
}



var generate = function () {
	for (var i = 0; i <= n; i++) found[i] = 0;
	done = false;
	ok = 0;
	pairs = 0;
	ant = -1;
	clicks = 0;
	for (var i = 0; i < height; i++) {
		$('table').append ("<tr> ");
		for (var j = 0; j < width; j++) {
			var value = random ();
			ids [i*width+j] = "#" + String (i*width+j);
			values [i*width+j] = value;
			$('tr:last').append ("<td> <div class = \"card\" id =\"" + String (i*width+j) + "\" >" + String (value) + "</div> </td>");
			$(ids[i*width+j]).fadeIn ('slow')
		}
		$('table').append ("</tr>");
	}
	$('.card').css ('background-color', 'DarkCyan');

}


	


$(document).ready (function () {
	$('#query').fadeIn ('slow');
	$('#send').on ('click', function () {
			width = Number (document.getElementById ('width').value);
	height = Number (document.getElementById ('height').value);
	$('#query').fadeOut ('fast');
	n = width * height / 2;
 	generate ();

	$('.card').on ('click', function () {
		var id = "#" + this.id
		var idFound = 0;
		for (var i = 0; i < 2*n && !idFound; i++) if (ids[i] == id) {
			flip (i);
			idFound = 1;
		}
		});
	});

})

