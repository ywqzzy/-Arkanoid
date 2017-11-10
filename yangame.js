var YanGame = function(fps,images,runCallback) {
	//images is an object with pictrues name
	//program will be run unless every pic was loaded
		var g = {
			actions: {},
			keydowns: {},
			images : {}
		}
		var canvas = document.querySelector('#id-canvas')
		var context = canvas.getContext('2d')
		g.canvas = canvas
		g.context = context
		g.drawImage = function(YanImage) {
				g.context.drawImage(YanImage.image,YanImage.x,YanImage.y)
		}
		//events
		window.addEventListener('keydown',function(event){
				g.keydowns[event.key] = true
		})
		window.addEventListener('keyup',function(event){
				g.keydowns[event.key] = false
		})
		//
		g.registerAction = function(key,callback) {
				g.actions[key] = callback
		}
		//timer
		window.fps = 30

		var runloop = function(fps) {
				//log(window.fps)
				var actions = Object.keys(g.actions)
				for(var i = 0; i < actions.length; i++) {
						var key = actions[i]
						if(g.keydowns[key]) {
								//如果按键被按下调用注册的action
								g.actions[key]()
						}
				}
				g.update()
				//clear
				context.clearRect(0,0,canvas.width,canvas.height)
				//draw
				g.draw()
				//next run loop
				setTimeout(function() {
						//events
						runloop()
				},1000/window.fps)
		}
		var loads = []
		var names = Object.keys(images)
		//log(names.length,'shit')
		//预先载入所有图片
		for(let i = 0; i < names.length ;i++) {
				let name = names[i]
				var path = images[name]
				let img = new Image()
				img.src = path
				img.onload = function() {
						//all pic are success
						//存入g.images中
						g.images[name] = img
						loads.push(1)
						//log("load")
						if(loads.length == names.length) {
								//console.log(g.images);
								g.run()
						}
				}
		}
		g.imageByName = function(name) {
			 // log('image by name', g.images)
				var img = g.images[name]
				var image = {
						w : img.width,
						h : img.height,
						image : img,
				}
				return image
		}
		g.run = function() {
			runCallback(g)
			setTimeout(function() {
					//events
					runloop()
			},1000/window.fps)
		}

		return g
}
