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
    
    this.tick = function () { 
		this.services.l.tick(this);
		this.services.v.render(this.level.viewModel); 
	};
		
    this.keyDown = function (e) { this.services.l.keyDown(e.which, this); };
    
    this.setup = function () {
        this.services.l = new logic();
        this.services.k = new keyboard(this.keyDown, this);
        this.services.v = new view("train");
        this.services.c = new clock(1000, this.tick, this);
		this.services.r = new levelRepository();
		
		this.level = this.services.r.load("test level");
    };
}