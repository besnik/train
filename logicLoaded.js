/* 
class logicLoaded
	represents logic for state when level is loaded and train is waiting for keypress to start moving
	name property represents name of the state
	
	possible state transitions:
		logicPaused
		logicRunning

ctor parameters
	n/a
	
public methods
	keyDown - handles logic for key down event. Updates model/state apropriately.
	tick - handles logic of clock's tick event
***************************/
function logicLoaded () {
	
	this.keyDown = function (context, key, app) {
		var clock = app.services.c;
		var l = app.level.train.locomotive;
		
		switch (key) {
			// "p" - pause
			case 80: 
				clock.stop();
				context.current = context.logic.paused;
				context.current.previous = this;
				break;

			// arrows sets direction of the train
			case 39:
				l.setRightDirection();
				context.current = context.logic.running;
				break;
			case 37:
				l.setLeftDirection();
				context.current = context.logic.running;
				break;
			case 40:
				l.setDownDirection();
				context.current = context.logic.running;
				break;
			case 38:
				l.setUpDirection();
				context.current = context.logic.running;
				break;
		}
	};
	
	this.tick = function (context, app) {

	};
};