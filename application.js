/*
application class
    wires together all services. idea is that services are independent as possible
    and on the central place they are put together.

ctor params:
    n/a
    
public methods:
    setup - sets up the application
************************************/
function application() {
    this.services = {};
	this.level = null;
	this.config = {};
    
    this.tick = function () {
		this.services.l.tick(this);
		//this.services.l.tick.call(this.services.l, this);
		this.services.v.render(this.level.viewModel);
	};
	
    this.keyDown = function (e) { this.services.l.keyDown(e.which, this); };
	
	this.loadLevel = function (name, callback) {
		this.level = this.services.r.load(name);
		this.services.v.initLevel(this.level.viewModel);
		if (typeof callback === "function") { callback(this); };
	};
    
    this.setup = function () {
		// setup config
		this.config.clockInterval = 125;
		this.config.ticksPerStep = 4;
	
		// setup services
        this.services.l = new logicContext();
        this.services.k = new keyboard(this.keyDown, this);
        this.services.v = new view();
        this.services.r = new levelRepository(this.config);
		this.services.c = new clock(this.config.clockInterval, this.tick, this);
		
		// load and init level
		this.loadLevel("test level");
		
		// start ticking
		this.services.c.start();
    };
}
