/* 
class logicCrashed
	executes when train is crashed
	
	possible state transitions:
		logicPaused
	
ctor parameters
	n/a
	
public methods
	keyDown - handles logic for key down event. Updates model/state apropriately.
	tick - handles logic of clock's tick event
***************************/
function logicCrashed () {
	
	this.keyDown = function (context, key, app) {

	};
	
	this.tick = function (context, app) {
		var locomotive = app.level.train.locomotive;
		if (locomotive.isTypeCrashing()) {
			locomotive.setTypeCrashed();
		};
	};
};