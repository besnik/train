/* 
class logicOpened
	executes when all jewels are taken and gate is open
	
	possible state transitions:
		logicPaused
	
ctor parameters
	n/a
	
public methods
	keyDown - handles logic for key down event. Updates model/state apropriately.
	tick - handles logic of clock's tick event
***************************/
function logicOpened () {
	
	// initialize base type
	logicOpened.baseCtor.call(this);
	
	this.keyDown = function (context, key, app) {
		var clock = app.services.c;
		var l = app.level.train.locomotive;
		
		switch (key) {
			case 80: // "p" - pause
				clock.stop();
				context.current = context.logic.paused;
				context.current.previous = this;
				break;
				
			// arrows sets direction of the train
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
	
	this.tick = function (context, app) {
		
		// before move
		if (this.detectGate(app)) {
			context.current = context.logic.finished;
			return;
		};
		
		if (this.detectCrash(context, app)) {
			app.level.train.locomotive.setTypeCrashing();
			context.current = context.logic.crashed;
			return;
		};
		
		var gate = app.level.gate;
		if (gate.isTypeOpening()) {
			gate.setTypeOpened();
		}
		
		// move
		app.level.train.move();
	};
	
	this.detectGate = function (app) {
		var locomotive = app.level.train.locomotive;
		var gate = app.level.gate;
		
		return this.isCollision(locomotive, gate);
	};
};

// type inheritance setup (prototype manipulation)
setupInheritance(logicOpened, logicBase);