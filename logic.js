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
		this.handleClock(key, app);
		this.handleTrain(key, app);
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
		var train = app.level.train;
		switch (key) {
			case 39:
				train.setRightDirection();
				break;
			case 37:
				train.setLeftDirection();
				break;
			case 40:
				train.setDownDirection();
				break;
			case 38:
				train.setUpDirection();
				break;
		}
	};
	
	this.tick = function(app) {
		var train = app.level.train;
		train.move();
	};
}