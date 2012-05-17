/*
class view
	renders given model to the browser's UI
	
public methods
	initLevel - initialize the view layer and underlying DOM elements
	render - updates browser's UI from given model

public properties
	messageArea - use show() and hide() methods

dependencies
	jQuery
********************************************/
function view() {
	this.level = $("#level");
	this.levelItems = null; // div that holds all items of level
	this.textureSize = 50;
	this.imageBasePath = "images/";
	this.images = {}; // hash table of image data with state
	this.messageArea = {}; // holds state of message with next level info
	
	// initialize view instance. shall be called only once per view instance life time
	this.init = function () {
		// validation
		if (typeof this.level === "undefined" || this.level.length == 0) { throw new Error("DIV element representing level was not found."); }
	
		// create level items
		var e = this.levelItems = $("<div id=\"levelItems\" />");	// create new element 
		this.level.append(e);
		
		// init image repository
		this.initImageRepository();
		
		// create message area
		this.initMessageArea();
	};

	// initialize level
	this.initLevel = function (viewModel) {
		// validation
		if (typeof viewModel === "undefined") { throw new Error("Missing input parameter (view model)."); }
		
		// remove all elements inside the div that holds images
		this.levelItems.children().remove();
		
		// set up level size of level container and message area
		var width = (viewModel.sizeX * this.textureSize) + "px";
		var height = (viewModel.sizeY * this.textureSize) + "px";
		this.level.css({ "width": width, "height": height });
		this.messageArea.element.css({ "width": width, "height": height });
	};
	
	// creates message area div 
	this.initMessageArea = function () {
		var e = this.messageArea.element = $("<div class=\"messageArea\"><div class=\"messageAreaLevel\">LEVEL 1</div><div class=\"messageAreaPassword\">PASSWORD: XYZ</div></div>");	// create new element 
		e.css({"display": "none" }); // initially not visible

		// make use of repeated background image
		var imageUrl = this.images["wall"].getImage();
		e.css({ "background-image": "url('" + imageUrl + "')",  });

		// connect to DOM and model. message area is independent of the level
		this.level.append(e);
		
		// methods for setting text
		this.messageArea.level = function (s) { this.element.find("div.messageAreaLevel").text("LEVEL " + s); };
		this.messageArea.password = function (s) { this.element.find("div.messageAreaPassword").text("password " + s); };
		this.messageArea.hide = function () { this.element.slideUp(); };
		this.messageArea.show = function (model) {  
			// 1. set text
			this.level(model.level);
			this.password(model.password);
			
			// 2. slide down
			this.element.slideDown();
		};
	};
	
	this.initImageRepository = function () {
		// train data
		var d = new imageData();
		d.name = "locomotive";
		d.addImage(this.imageBasePath + "train1.jpg");
		d.addImage(this.imageBasePath + "train2.jpg");
		d.addImage(this.imageBasePath + "train3.jpg");
		d.addImage(this.imageBasePath + "train4.jpg");
		this.images[d.name] = d;
		
		// train crashing
		var d = new imageData();
		d.name = "locomotiveCrashing";
		d.addImage(this.imageBasePath + "trainCrashing1.jpg");
		d.addImage(this.imageBasePath + "trainCrashing2.jpg");
		d.addImage(this.imageBasePath + "trainCrashing3.jpg");
		d.addImage(this.imageBasePath + "trainCrashing4.jpg");
		this.images[d.name] = d;
		
		// train crashed
		var d = new imageData();
		d.name = "locomotiveCrashed";
		d.addImage(this.imageBasePath + "trainCrashed1.jpg");
		d.addImage(this.imageBasePath + "trainCrashed2.jpg");
		d.addImage(this.imageBasePath + "trainCrashed3.jpg");
		d.addImage(this.imageBasePath + "trainCrashed4.jpg");
		this.images[d.name] = d;
		
		// jewel
		var d = new imageData();
		d.name = "jewel";
		d.addImage(this.imageBasePath + "jewel1.jpg");
		d.addImage(this.imageBasePath + "jewel2.jpg");
		d.addImage(this.imageBasePath + "jewel3.jpg");
		d.addImage(this.imageBasePath + "jewel4.jpg");
		this.images[d.name] = d;
		
		// gate
		var d = new imageData();
		d.name = "gate";
		d.addImage(this.imageBasePath + "gate.jpg");
		this.images[d.name] = d;

		// gate opening
		var d = new imageData();
		d.name = "gateOpening";
		d.addImage(this.imageBasePath + "gateOpening1.jpg");
		d.addImage(this.imageBasePath + "gateOpening2.jpg");
		d.addImage(this.imageBasePath + "gateOpening3.jpg");
		d.addImage(this.imageBasePath + "gateOpening4.jpg");
		this.images[d.name] = d;
		
		// gate opened
		var d = new imageData();
		d.name = "gateOpened";
		d.addImage(this.imageBasePath + "gateOpened.jpg");
		this.images[d.name] = d;

		// wall data
		var d = new imageData();
		d.name = "wall";
		d.addImage(this.imageBasePath + "wall.jpg");
		this.images[d.name] = d;
		
		// wagon data
		var d = new imageData();
		d.name = "wagon";
		d.addImage(this.imageBasePath + "wagon.jpg");
		this.images[d.name] = d;
	};
	
	this.incrementImages = function () {
		for (var key in this.images) {
			var d = this.images[key];
			d.inc();
		};
	};
	
	this.render = function (viewModel) {
		if (typeof viewModel === "undefined" || typeof viewModel.items === "undefined") { return; }
	
		// get items to render
		var items = viewModel.items;
		
		// walk through array of items and update
		for (var i in items) {
			var item = items[i];
			if (typeof item === "undefined" || item == null) { continue; }
			
			var viewModel = item.viewModel;
			
			// create view model if necessary
			if (typeof viewModel === "undefined") {
				viewModel = {};
				viewModel.element = $("<img />").css({ "position": "absolute" });
				
				// connect to DOM and model
				this.levelItems.append(viewModel.element);
				item.viewModel = viewModel;
			};
			
			// update position
			var position = this.toPosition(item);
			var imagePath = this.getImagePath(item);
			viewModel.element.attr({ src: imagePath }).css({ "left": position.left, "top": position.top });
		}
		
		this.incrementImages();
	};
	
	this.getImagePath = function (item) {
		var d = this.images[item.type];
		return d.getImage();
	};
	
	this.toPosition = function (model) {
		var result = {};
		result.left = (model.x * this.textureSize).toString() + "px";
		result.top = (model.y * this.textureSize).toString() + "px";
		return result;
	};

	// call initialization as last step when all methods are initialized - executed during creating instance of the view
	this.init();
}

