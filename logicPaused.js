/* 
class logicPaused
	activated with paused key. clock is stopped at this time. need to start the clock
	when switching to previous state
	
	possible state transitions:
		any
	
ctor parameters
	n/a
	
public methods
	keyDown - handles logic for key down event. Updates model/state apropriately.
	tick - handles logic of clock's tick event
***************************/
function logicPaused () {

	this.previous = null; // holds logic that was executed before paused
	
	this.keyDown = function (context, key, app) {
		var clock = app.services.c;
		switch (key) {
			case 80: // "p" - pause
				context.current = this.previous;
				this.previous = null; 
					
				clock.start();
				break;
		}
	};
	
	this.tick = function (context, app) {
		
	};
};