/*
statusBar class
	Used in view engine to handle status bar. Proxy to sets values of scene and score.

ctor parameters:
	N/A
	
public methods:
	setScene - sets the number of the scene
	setScore - sets game points
**************************************************************************/
function statusBar () {
	this.html = {
		element: null,		// main div for status bar
		score: null,		// score div
		scoreValue: null,	// score value element
		password: null,		// password div
		scene: null,		// scene div
		sceneValue: null	// scene value element
	};
	
	this.init  = function (config) {
		// create status bar parent div
		var e = this.html.element = $("<div class=\"statusBar\"></div>");
		var height = config.height + "px";
		e.css({"height":height});
		
		// create inner divs for score, password, scene
		
		// score
		var score = this.html.score = $("<div class=\"score\">SCORE </div>");
		var scoreValue = this.html.scoreValue = $("<span>0</span>");
		score.append(scoreValue);
		
		// password
		var password = this.html.password = $("<div class=\"pwd\">P PASSWORD</div>");
		
		// scene
		var scene = this.html.scene = $("<div class=\"scene\">SCENE </div>");
		var sceneValue = this.html.sceneValue = $("<span>1</span>");
		scene.append(sceneValue);
		
		// append to parent
		e.append(score);
		e.append(password);
		e.append(scene);
		
		// connect to DOM
		config.level.append(e);
	};
	
	this.setScore = function (v) {
		if (typeof v !== "number") { return; }
		this.html.scoreValueElement.text(v);
	}
	
	this.setScene = function (v) {
		if (typeof v !== "number") { return; }
		this.html.sceneValueElement.text(v);
	}
}
