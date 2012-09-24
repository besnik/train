/* 
class logic
	represents business logic of the train.
	stateless service.

ctor parameters
	n/a
	
public methods
	keyDown - handles logic for key down event. Updates model/state apropriately.
	tick - handles logic of clock's tick event
***************************/
function logic() {
	
	this.keyDown = function (key, app) {
		this.loadNextLevel(key, app);
	};
	
	this.loadNextLevel = function (key, app) {
		var level = app.level;
		if (level.isStateMessage()) {
			app.loadNextLevel( level.nextLevel.name, function (app) { app.services.v.slidingWall.hide(); } );
		};
	};


	
	this.tick = function (app) {
		var level = app.level;
		level.index++;
		
		// shall logic be executed?
		if (level.index >= app.config.ticksPerStep) {
			level.index = 0;
			
			this.processMove(app);
			this.processFinished(app);
			this.processMessage(app); // TODO: this is called multiple times when in message state. refactor!
		}
	};
	
	this.processMove = function (app) {
		var level = app.level;
		var context = { jewelData: null };
		
		if (level.isStateLoaded()) {
			this.changeAnimations(app, context);
			this.beforeMove(app, context);
			this.move(app, context);
			this.afterMove(app, context);
		}
	};
	
	this.processFinished = function (app) {
		var level = app.level;
		var message = level.message;
		
		if (level.isStateFinished()) {
			message.updateState();
			if (message.isDisplayed) { level.setStateMessage(); }
		};
	};
	
	this.processMessage = function (app) {
		var level = app.level;
		
		if (level.isStateMessage()) {
			var l = level.nextLevel;
			var sw = app.services.v.slidingWall;
			sw.show( { level: l.name, password: l.password } );
		}
	};
	
	this.changeAnimations = function (app, context) {
		var level = app.level;
		var gate = level.gate;
		var train = level.train;
		var locomotive = train.locomotive;
	
		// finish gate animation
		if (gate.isStateOpened() && gate.isTypeOpening()) { gate.setTypeOpened(); }
		
		// if train is crashed and locomotive is finished with crashing animation, set to crashed animation
		if (train.isStateCrashed() && locomotive.isTypeCrashing()) { 
			locomotive.setTypeCrashed();
			// maybe show message to restart level?
		}
	};
	
	this.beforeMove = function (app, context) {
		var level = app.level;
		var train = level.train;
		var locomotive = train.locomotive;
		
		// is gate reached?
		if (train.isStateRunning() && this.detectGate(app)) {
			train.setStateStopped();
			level.setStateFinished();
		};

		// if train is running, detect colision and stop if necessary
		if (train.isStateRunning() && this.detectCrash(app)) {
			train.setStateCrashed();		// state
			locomotive.setTypeCrashing();	// animation
		};
		
		// check if there is a jewel to add to the train
		if (train.isStateRunning()) { 
			context.jewelData = this.detectJewel(app); 
		};
	};
	
	this.move = function (app, context) {
		var level = app.level;
		var train = level.train;
		
		// at this point all checks that could stop the train passed
		if (train.isStateRunning()) { train.move();	};
	};
	
	this.afterMove = function (app, context) {
		var level = app.level;
	
		// add wagon?
		var jewelData = context.jewelData;
		if (jewelData != null) { 
			this.addWagon(jewelData, level); 
			this.jewelTaken(app, context);
		};
		
		// sync points to view model
		level.viewModel.points = level.points;
	};
	
	this.jewelTaken = function(app, context) {
		var gate = app.level.gate;
		
		// all jewels taken? open gate
		if (app.level.jewels.length == 0 && gate.isStateClosed()) {
			gate.setStateOpened();	// state
			gate.setTypeOpening();	// animation
		};
	};
	
	this.addWagon = function(jewelData, level) {
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
	
	this.toWagonType = function (w) { w.type = "wagon";	};
	
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
			if (this.isCollision(position, jewels[i])) {
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
	
	this.detectGate = function (app) {
		var locomotive = app.level.train.locomotive;
		var gate = app.level.gate;
		
		return this.isCollision(locomotive, gate);
	};
		
	this.detectCrash = function (app) {
		// 1. get future train position
		// 2. detect crash with crashable objects (walls, train)
		// 3. crash (stop)
		
		var isCrashed = false;
		var locomotive = app.level.train.locomotive;
		var walls = app.level.walls;
		var gate = app.level.gate;
		
		var position = locomotive.getFuturePosition();
		
		// check walls
		for (var i = 0; i < walls.length; i++) {
			if (this.isCollision(position, walls[i])) {
				isCrashed = true;
				break;
			};
		};
		
		// check gate
		if (gate.isStateClosed() && this.isCollision(position, gate)) {
			isCrashed = true;
		};
		
		return isCrashed;
	};
	
	this.isCollision = function (o1, o2) {
		return (o1.x === o2.x && o1.y === o2.y);
	};

}
