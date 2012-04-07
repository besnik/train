/* 
class logic
	represents business logic of the train

ctor parameters
	n/a
	
public methods
	keyDown - handles logic for key down event. Updates model/state apropriately.
	tick - handles logic of clock's tick event
***************************/
function logic() {
	
	this.keyDown = function (key, app) {
		this.setLevelRunning(key, app);
		this.handleClock(key, app);
		this.handleTrain(key, app);
	};
	
	this.setLevelRunning = function (key, app) {
		if (app.level.isStatusNew()) { 
			if (key == 37 || key == 39 || key == 40 || key == 38) {
				app.level.setStatusRunning(); 
			}
		}
	};
	
	this.handleClock = function (key, app) {
		var clock = app.services.c;
		switch (key) {
			case 32:
				if (clock.isRunning()) {
					clock.stop();
				} else {
					clock.start();
				}
			break;
		}
	};
	
	this.handleTrain = function (key, app) {
		var l = app.level.train.locomotive;
		switch (key) {
			case 39:
				l.setRightDirection();
				break;
			case 37:
				l.setLeftDirection();
				break;
			case 40:
				l.setDownDirection();
				break;
			case 38:
				l.setUpDirection();
				break;
		}
	};
	
	this.tick = function (app) {
		var level = app.level;
		var train = level.train;
		var locomotive = train.locomotive;
		var jewelData = null;
		level.index++;
		
		// shall train move?
		if (level.index >= app.config.ticksPerStep) {
			level.index = 0;
			
			// if crashed and train is finished with crashing animation, set to crashed animation
			if (level.isStatusCrashed() && locomotive.isCrashing()) { 
				locomotive.setCrashed();
				// maybe show message to restart level?
			}
			
			// if running, detect colision and stop if necessary
			if (level.isStatusRunning() && this.detectCrash(app)) {
				level.setStatusCrashed();
				locomotive.setCrashing();
			};
			
			// check if there is a jewel to add
			if (level.isStatusRunning()) {
				jewelData = this.detectJewel(app);
			};
			
			// move if all previous checks passed
			if (level.isStatusRunning()) {
				train.move();
			};
			
			// add wagon?
			if (jewelData != null) {
				this.addWagon(jewelData, level);
			};
		}
	};
	
	this.addWagon = function(jewelData, level) {
		var train = level.train;
		var lastWagon = jewelData.lastWagon;
		
		// remove jewel
		var w = this.removeFromJewels(jewelData, level.jewels);
		
		// set position
		w.x = lastWagon.x;
		w.y = lastWagon.y;
		w.direction = lastWagon.direction;
		
		// set type
		this.toWagonType(w);
		
		// add wagon
		train.addWagon(w);
	};
	
	this.toWagonType = function (w) {
		w.type = "wagon";
	};
	
	this.removeFromJewels = function (jewelData, jewels) {
		var j = jewels[jewelData.index];
		jewels.splice(jewelData.index, 1); // splice returns not usable object (maybe already garbage collected?)
		return j;
	};
	
	this.detectJewel = function (app) {
		var train = app.level.train;
		var locomotive = train.locomotive;
		var jewels = app.level.jewels;
		var position = locomotive.getFuturePosition();
		var jewelData = null;
		
		// detect colision
		for (var i = 0; i < jewels.length; i++) {
			if (this.isColision(position, jewels[i])) {
				jewelData = {};
				jewelData.index = i;
				break;
			};
		};
		
		if (jewelData != null) {
			jewelData.lastWagon = train.getLastWagonPosition();
		};
		
		return jewelData;
	};
		
	this.detectCrash = function (app) {
		// 1. get future train position
		// 2. detect crash with crashable objects (walls, train)
		// 3. crash (stop)
		
		var isCrashed = false;
		var locomotive = app.level.train.locomotive;
		var walls = app.level.walls;
		
		var position = locomotive.getFuturePosition();
		
		for (var i = 0; i < walls.length; i++) {
			if (this.isColision(position, walls[i])) {
				isCrashed = true;
				break;
			};
		};
		
		return isCrashed;
	};
	
	this.isColision = function (o1, o2) {
		return (o1.x === o2.x && o1.y === o2.y);
	};
	
}
