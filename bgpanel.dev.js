/*
Copyright (c) 2015 Arman Sarsenov
Email: tencry@mail.ru
Website: www.arman.pro


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

$.fn.bgPanel = function(options) {
	var DEBUG_MODE = true;
	var defaults = {
		panelColor: '#333',
		bgColors: ['#262626','#2E2E2E','#383838','#444'],
		paintObject: 'body'
	};
	options = $.extend(defaults, options);
	var style = "<style>\
.bgpanel {position: fixed;top: 200px;right: 0;width: 60px;}\
.bgpanel ul {list-style: none;padding-left: 15px;margin: 15px 0;}\
.bgpanel ul li i.colorbox {display: inline-block;width: 30px;height: 30px;cursor: pointer;}\
</style>";
	$("head").append(style)
	
	var html = '<div class="bgpanel" style="background-color: '+options.panelColor+';"><ul>';
	/*for(var c in options.bgColors) {
		html += '<li><i class="colorbox" style="background-color: '+options.bgColors[c]+';"></i></li>';
	}*/
	options.bgColors.forEach( function (color) {
		html += '<li><i class="colorbox" style="background-color: '+color+';"></i></li>';
	});
	html += '</ul></div>';
	$("body").append(html);
	
	$(".bgpanel .colorbox").on("click", function(e) {
		var selectedColor = $(e.target).css("background-color");
		Log("Clicked box color " + selectedColor);
		changeBackground(selectedColor);
		setCookie("bgColor", selectedColor, 1);
	});
	
	function changeBackground(color) {
		$(options.paintObject).css("background-color", color);
	}
	
	function Log(string) {
		if (DEBUG_MODE) console.log(string);
	}
	
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	}
	
	var bgColor = getCookie("bgColor");
	if (bgColor) changeBackground(bgColor);
};