/*
levelItem class
	base class for every object in the level.
	note: use setupInheritance method from class.js to setup
		  this type as parent type
	
public methods
	move - updates model based on movement data
	setRightDirection - sets direction of the item to the right
	setLeftDirection - sets direction of the item to the left
	setDownDirection - sets direction of the item to the down
	setUpDirection - sets direction of the item to the up
*******************************/
function levelItem() {
	this.x = 0;
	this.y = 0;
	this.type = "";
	this.direction = "right";
	this.step = 1;
	
	this.move = function () {
		switch(this.direction) {
			case "right":	this.x += this.step;	break;
			case "left" :	this.x -= this.step;	break;
			case "down" :	this.y += this.step;	break;
			case "up"   :	this.y -= this.step;	break;
		}
	};
	
	this.setRightDirection = function () { this.direction = "right"; };
	this.setLeftDirection  = function () { this.direction = "left";  };
	this.setDownDirection  = function () { this.direction = "down";  };
	this.setUpDirection    = function () { this.direction = "up";    };
}