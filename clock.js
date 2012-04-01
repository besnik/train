/*
clock class
ctor parameters:
	interval - time interval between ticks in miliseconds (1000ms = 1sec)
	callback - method to call on a tick
	callbackScope - usually object of the callback
	
public methods:
	start - starts ticking and executing callback function
	stop - stops ticking
**************************************************************************/
function clock(interval, callback, callbackScope) {
	if (typeof interval !== "number") { throw new Error("interval parameter must be a number!"); }
	this.interval = interval;

	if (typeof callback !== "function") { throw new Error("callback parameter must be a function!"); }
	this.callback = callback;
	
	if (typeof callbackScope !== "object") { throw new Error("callbackScope parameter must be an object!"); }
	this.callbackScope = callbackScope;

	// stores timer handle so we can stop timer later
	this.intervalId = null;
	
	
	
	this.start = function () {
		if (!this.isRunning()) {
			var self = this; // self is used to create closure and keep ref to clock instance in anonymous event handler
			this.intervalId = setInterval(function() { self.callback.call(self.callbackScope); }, this.interval); // need to change scope of callback so this is pointing to original callback scope
		}
	};
	
	this.stop = function () {
		if (this.isRunning()) {
			clearTimeout(this.intervalId);
            this.intervalId = null;
		}
	};
	
	this.isRunning = function () { return this.intervalId !== null;	};
}



