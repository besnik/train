/*
slidingWall class
	Used in view engine to handle sliding wall with password for next level.

ctor parameters:
	N/A
	
public methods:
	show - shows sliding wall with level number and password for next level
	hide - hides sliding wall
	setSize - sets width and height of sliding wall
**************************************************************************/
function slidingWall () {
	this.html = {
		element: null,		// parent div for message area
		level: null,		// level div
		levelValue: null,	// level value element
		password: null,		// password div
		passwordValue: null	// password value element
	};
	
	this.isInitialized = false; // used by validation of public methods
	
	this.init = function (config) {
		// parent element
		var e = this.html.element = $("<div class=\"slidingWall\"></div>");
		e.css({"display": "none" }); // initially not visible
		e.css({ "background-image": "url('" + config.imageUrl + "')",  }); // make use of repeated background image
		
		// level
		var level = this.html.level = $("<div class=\"level\">LEVEL </div>");
		var levelValue = this.html.levelValue = $("<span>1</span>");
		level.append(levelValue);
		
		// password
		var password = this.html.password = $("<div class=\"password\">PASSWORD: </div>");
		var passwordValue = this.html.passwordValue = $("<span>XYZ</span>");
		password.append(passwordValue);
		
		// add to parent
		e.append(level);
		e.append(password);

		// connect to DOM
		config.level.append(e);
		
		// set flag
		this.isInitialized = true;
	};
	
	// sets width and height of the sliding wall
	this.setSize = function (width, height) {
		if (typeof width !== "number" || typeof height !== "number") { return; }
		this.html.element.css({"width":width + "px", "height":height + "px"});
	};
	
	// hides sliding wall
	this.hide = function () {
		if (!this.isInitialized) { return; }
		this.html.element.slideUp(); 
	};
	
	// shows sliding wall with level number and password for next level
	this.show = function (model) {
		if (!this.isInitialized || typeof model === "undefined") { return; }
	
		// 1. set text
		this.html.levelValue.text(model.level);
		this.html.passwordValue.text(model.password); 
		
		// 2. slide down
		this.html.element.slideDown();
	};
}
