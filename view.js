/*
class view
	renders given model to the browser's UI
	
public methods
	init - initialize the view layer and underlying browser
	render - updates browser's UI from given model

dependencies
	jQuery
********************************************/
function view() {
	this.level = $("#level");
	this.textureSize = 50;
	this.imageBasePath = "images/";
	this.images = {}; // hash table of image data with state
	
	this.init = function (viewModel) {
		this.validateViewModel(viewModel);
		this.initHtml(viewModel);
		this.initImages();
	};
	
	this.validateViewModel = function (viewModel) {
		if (typeof viewModel === "undefined") { throw new Error("Missing input parameter (view model)."); }
		if (typeof this.level === "undefined" || this.level.length == 0) { throw new Error("DIV element representing level was not found."); }
	};
	
	this.initImages = function () {
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
		
		// wall data
		var d = new imageData();
		d.name = "wall";
		d.addImage(this.imageBasePath + "wall.jpg");
		this.images[d.name] = d;
	};
	
	this.initHtml = function (viewModel) {
		// remove all elements inside the div
		this.level.children().remove();
		
		// set up level size
		var width = (viewModel.sizeX * this.textureSize) + "px";
		var height = (viewModel.sizeY * this.textureSize) + "px";
		this.level.css({ "width": width, "height": height });
	};
	
	this.incrementImages = function () {
		for (var key in this.images) {
			var d = this.images[key];
			d.inc();
		};
	};
	
	this.render = function (viewModel) {
		// validation
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
				this.level.append(viewModel.element);
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

}

