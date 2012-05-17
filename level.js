/*
level class
	holds all domain data and state for the level
**************************************************/
function level() {
	// level params
	this.sizeX = 0;
	this.sizeY = 0;
	this.name = "";
	this.config = null; // global config object
	this.nextLevel = null; // next level data
	
	// objects
	this.train = null;
	this.walls = null;
	this.jewels = null;
	this.viewModel = null;
	
	// moving index
	this.index = -1; // first tick increments to correct 0 index so images are matching
	
	// state
	this.state = "loaded"; // "loaded", "finished", "message"
	this.setStateLoaded = function () { this.state = "loaded"; }
	this.setStateFinished = function () { this.state = "finished"; }
	this.setStateMessage= function () { this.state = "message"; }
	this.isStateLoaded = function () { return this.state === "loaded"; }
	this.isStateFinished = function () { return this.state === "finished"; }
	this.isStateMessage = function () { return this.state === "message"; }
}
