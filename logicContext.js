/* 
class logicContext
	implementation of state pattern for business logic.
	public methods delegates calls to the currently selected logic
	the instance holds state => currently selected logic
	

ctor parameters
	n/a
	
public methods
	keyDown - handles logic for key down event. Updates model/state apropriately.
	tick - handles logic of clock's tick event
***************************/
function logicContext() {
	this.current = null; // holds logic for current state
	this.logic = {}; // cache of the logic
	
	this.keyDown = function (key, app) {
		this.current.keyDown(this, key, app);
	};
	
	this.tick = function (app) {
		var level = app.level;
		level.index++;
		
		// shall logic be executed?
		if (level.index >= app.config.ticksPerStep) {
			level.index = 0;
			this.current.tick(this, app);
		}
	};
	
	this.setup = function () {
		this.logic.loaded = new logicLoaded();
		this.logic.paused = new logicPaused();
		this.logic.running = new logicRunning();
		this.logic.crashed = new logicCrashed();
		this.logic.opened = new logicOpened();
		this.logic.finished = new logicFinished();
		
		// set initial logic
		this.current = this.logic.loaded;
	};
	
	this.setup(); // initialize
};