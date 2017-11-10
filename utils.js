var e = sel => document.querySelector(sel)
var log = function() {
		//e('#id-text-log').value += '\n' + s
		log = console.log.bind(console)
}

var imageFromPath = function(path) {
		var img = new Image()
		img.src = path
		return img
}
var rectIntersects = function(a,b) {
		var o = a
		var d = b
		var px, py;
	 	px = o.x <= d.x ? d.x : o.x;
	 	py = o.y <= d.y ? d.y : o.y;

	 // 判断点是否都在两个对象中
	 	if (px >= o.x && px <= o.x + o.image.width && py >= o.y && py <= o.y + o.image.height && px >= d.x && px <= d.x + d.image.width && py >= d.y && py <= d.y + d.image.height) {
			 	return true;
	 	} else {
			 return false;
	 	}
}
