/*
train class
	model of the train; maintains it's movement data
	
public methods
	move - updates trains model based on movement data
	setRightDirection - sets direction of the train to the right
	setLeftDirection - sets direction of the train to the left
	setDownDirection - sets direction of the train to the down
	setUpDirection - sets direction of the train to the up
*******************************/
function train() {
	this.x = 0;
	this.y = 0;
	this.type = "train";
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