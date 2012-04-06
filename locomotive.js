/*
locomotive class
	holds state of the locomotive and contains functionality
	to get info about the state and manipulate it.
	
public methods
	getFuturePosition - gets object with x,y of the future movement
	setCrashing - changes locomotive type
	setCrashed - changes locomotive type
	isCrashing - gets true if type of locomotive is crashing
*******************************/
function locomotive() {
	// initialize base type
	locomotive.baseCtor.call(this); 

	// attributes and override
	this.type = "locomotive";
	
	// methods
	this.getFuturePosition = function () {
		var clone = new levelItem();
		clone.x = this.x;
		clone.y = this.y;
		clone.direction = this.direction;
		clone.step = this.step;
		clone.move();
		
		return clone; // we are actually interested only in (x,y)
	};
	
	this.setCrashing = function () { this.type = "locomotiveCrashing"; };
	this.setCrashed = function () { this.type = "locomotiveCrashed"; };
	this.isCrashing = function () { return this.type = "locomotiveCrashing"; };
}


// type inheritance setup (prototype manipulation)
setupInheritance(locomotive, levelItem);
