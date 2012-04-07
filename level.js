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
	
	// objects
	this.train = null;
	this.walls = null;
	this.jewels = null;
	this.viewModel = null;
	
	// moving state
	this.index = -1; // first tick increments to correct 0 index so images are matching
	this.status = "new"; // "new", "running", "crashed"
	this.setStatusNew = function () { this.status = "new"; }
	this.setStatusRunning = function () { this.status = "running"; }
	this.setStatusCrashed = function () { this.status = "crashed"; }
	this.isStatusNew = function () { return this.status === "new"; }
	this.isStatusRunning = function () { return this.status === "running"; }
	this.isStatusCrashed = function () { return this.status === "crashed"; }
}
