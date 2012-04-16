function gate() {
	// initialize base type
	gate.baseCtor.call(this); 
	
	// attributes and override
	this.type = "gate";
	this.setTypeOpening = function () { this.type = "gateOpening"; }
	this.setTypeOpened = function () { this.type = "gateOpened"; }
	this.isTypeOpening = function () { return this.type = "gateOpening"; }
	
	this.state = "closed"; // "closed", "opened"
	this.setStateOpened = function () { this.state = "opened"; }
	this.isStateClosed = function () { return this.state === "closed"; }
	this.isStateOpened = function () { return this.state === "opened"; }
}

// type inheritance setup (prototype manipulation)
setupInheritance(gate, levelItem);
