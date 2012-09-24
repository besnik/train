/* 
class logicFinished
	executes when train enters the gate
	
	possible state transitions:
		n/a
	
ctor parameters
	n/a
	
public methods
	keyDown - handles logic for key down event. Updates model/state apropriately.
	tick - handles logic of clock's tick event
***************************/
function logicFinished () {
	this.keyDown = function (context, key, app) {
		
	};
	
	this.tick = function (context, app) {
		var clock = app.services.c;
		clock.stop();
	};
};