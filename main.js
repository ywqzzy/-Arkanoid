var loadLevel = function (game, n) {
	var blocks = []
	n = n - 1
	var level = levels[n]
	for (var i = 0; i < level.length; i++) {
		var p = level[i]
		var b = Block(game, p)
		blocks.push(b)
	}
	return blocks
}
var blocks = []
var enableDebugMode = function (game, enable) {
	if (!enable) {
		return
	}
	window.paused = false
	//for debug
	window.addEventListener('keydown', function (evnet) {
		var k = event.key
		if (k == 'p') {
			//暂停功能
			//console.log("fuck")
			window.paused = !window.paused
		} else if ("1234567".includes(k)) {
			blocks = loadLevel(game, Number(k))
		}
	})
	// control speed
	document.querySelector('#id-input-speed').addEventListener('input', function () {
		var input = event.target
		//log (event,input.value)
		window.fps = input.value
	})
}
var __main = function () {

	var score = 0

	var images = {
		ball: 'ball.png',
		block: 'block.png',
		paddle: 'paddle.png',
	}
	var game = YanGame(60, images, function (g) {
		var paddle = Paddle(game)
		var ball = Ball(game)

		blocks = loadLevel(game, 2)

		var paused = false

		game.registerAction('a', function () {
			paddle.moveLeft()
		})
		game.registerAction('d', function () {
			paddle.moveRight()
		})
		game.registerAction('f', function () {
			ball.fire()
		})
		//game.registerAction('p',function(){
		//		paused = !paused
		//})
		game.update = function () {
			if (window.paused) return
			ball.move()
			//判断相撞
			if (paddle.collide(ball)) {
				ball.反弹()
			}
			//判断ball和blocks相撞
			for (var i = 0; i < blocks.length; i++) {
				var block = blocks[i]
				if (block.collide(ball)) {
					log('block 相撞')
					block.kill()
					ball.反弹()
					//更新分数
					score += 100
				}
			}
		}
		game.draw = function () {
			//draw background
			game.context.fillStyle = "#554"
			game.context.fillRect(0,0,400,400);
			game.drawImage(paddle)
			game.drawImage(ball)
			//draw blocks
			for (var i = 0; i < blocks.length; i++) {
				var block = blocks[i]
				if (block.alive) {
					game.drawImage(block)
				}
			}
			//drwa labels
			game.context.fillText("分数：" + score, 10, 290)
		}
	})
	enableDebugMode(game, true)
}
__main()
