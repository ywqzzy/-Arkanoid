var Paddle = function(game) {
	  var o = game.imageByName('paddle')
	/*  var o = {
		    image: image,
				x: 100,
				y: 200,
				speed: 5,
		}*/
		o.speed = 15
		o.x = 100
		o.y = 250
		
		o.move = function (x) {
				if(x < 0) {
						x = 0
				}
				if(x > 400 - o.image.width) {
						x = 400 - o.image.width
				}
				o.x = x
		}
		o.moveLeft = function() {
				o.move(o.x - o.speed)
		}
		o.moveRight = function() {
				o.move(o.x + o.speed)
		}
		o.collide = function(b) {
				return rectIntersects(o,b) || rectIntersects(b,o)
		}
		return o
}
