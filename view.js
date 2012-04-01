/*
class view
	renders given model to the browser's UI
	
public methods
	render - updates browser's UI from given model

dependencies
	jQuery
********************************************/
function view() {
	this.level = $("#level");
	this.moveSize = 10;
	
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
				
				// build element
				viewModel.element = $("<img />").attr({ src: "train.jpg" }).css({ "position": "absolute" });
				
				// connect to DOM and model
				this.level.append(viewModel.element);
				item.viewModel = viewModel;
			};
			
			// update position
			var position = this.ToPosition(item);
			viewModel.element.css({ "left": position.left, "top": position.top });
		}
	};
	
	this.ToPosition = function (model) {
		var result = {};
		result.left = (model.x * this.moveSize).toString() + "px";
		result.top = (model.y * this.moveSize).toString() + "px";
		return result;
	};
}

