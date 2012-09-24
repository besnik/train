/* 
class logicRunning
	logic that is represented by running train when all jewels are not taken and gate is closed
	
	possible state transitions:
		logicPaused
		logicCrashed
		logicFinished
	
ctor parameters
	n/a
	
public methods
	keyDown - handles logic for key down event. Updates model/state apropriately.
	tick - handles logic of clock's tick event
***************************/
function logicRunning () {
	
	// initialize base type
	logicRunning.baseCtor.call(this);
	
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
		var moveContext = { jewelData: null, isStateChanged: false };
		
		// before move
		this.beforeMove(context, app, moveContext);
		if (moveContext.isStateChanged) { return; }
		
		// move
		app.level.train.move();
		
		// after move
		this.afterMove(context, app, moveContext);
		if (moveContext.isStateChanged) { return; }
	};
	
	this.afterMove = function (context, app, moveContext) {
		var level = app.level;
	
		// add wagon?
		var jewelData = moveContext.jewelData;
		if (jewelData != null) { 
			this.addWagon(jewelData, level); 
			this.jewelTaken(context, app, moveContext);
		};
	};
	
	this.jewelTaken = function (context, app, moveContext) {
		var gate = app.level.gate;
		
		// all jewels taken? open gate
		if (app.level.jewels.length == 0) {
			gate.setTypeOpening();
			
			context.current = context.logic.opened;
			moveContext.isStateChanged = true;
			return;
		};
	};
	
	this.addWagon = function (jewelData, level) {
		var train = level.train;
		var lastWagon = jewelData.lastWagon;
		
		// remove jewel
		var w = this.removeFromJewels(jewelData, level.jewels);
		
		// increase level points
		if (typeof w.points === "number") {	level.points += w.points; };
		
		// set position
		w.x = lastWagon.x;
		w.y = lastWagon.y;
		w.direction = lastWagon.direction;
		
		// set type
		this.toWagonType(w);
		
		// add wagon
		train.addWagon(w);
	};
	
	this.toWagonType = function (item) { 
		item.type = "wagon"; 
	};
	
	this.removeFromJewels = function (jewelData, jewels) {
		var j = jewels[jewelData.index];
		jewels.splice(jewelData.index, 1); // splice returns not usable object (maybe already garbage collected?)
		return j;
	};
	
	this.beforeMove = function (context, app, moveContext) {
		// detect colision
		if (this.detectCrash(context, app)) {
			app.level.train.locomotive.setTypeCrashing();
			context.current = context.logic.crashed;
			moveContext.isStateChanged = true;
			return;
		};
		
		// detect jewel
		moveContext.jewelData = this.detectJewel(context, app);
	};
	
	this.detectCrash = function (context, app) {
		var isCrashed = logicRunning.prototype.detectCrash(context, app);	// call base method
		
		if (!isCrashed) {
			// check gate
			var locomotive = app.level.train.locomotive;
			var position = locomotive.getFuturePosition();
			var gate = app.level.gate;
			
			if (this.isCollision(position, gate)) {
				isCrashed = true;
			};
		}
		
		return isCrashed;
	};
	
	this.detectJewel = function (context, app) {
		var train = app.level.train;
		var locomotive = train.locomotive;
		var jewels = app.level.jewels;
		var position = locomotive.getFuturePosition();
		var jewelData = null;
		
		// detect colision
		for (var i = 0; i < jewels.length; i++) {
			if (this.isCollision(position, jewels[i])) {
				jewelData = {};
				jewelData.index = i;
				break;
			};
		};
		
		// if detected, store jewel's future position from last wagon
		if (jewelData != null) {
			jewelData.lastWagon = train.getLastWagonPosition();
		};
		
		return jewelData;
	};

};

// type inheritance setup (prototype manipulation)
setupInheritance(logicRunning, logicBase);