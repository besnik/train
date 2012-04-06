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
		this.services.v.render(this.level.viewModel);
	};
	
    this.keyDown = function (e) { this.services.l.keyDown(e.which, this); };
    
    this.setup = function () {
		// setup config
		this.config.clockInterval = 125;
		this.config.ticksPerStep = 4;
	
		// setup services
        this.services.l = new logic();
        this.services.k = new keyboard(this.keyDown, this);
        this.services.v = new view();
        this.services.r = new levelRepository(this.config);
		this.services.c = new clock(this.config.clockInterval, this.tick, this);
		
		// load and init level
		this.level = this.services.r.load("test level");
		this.services.v.init(this.level.viewModel);
    };
}
