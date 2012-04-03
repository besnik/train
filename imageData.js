/*
class imageData
	stores image file paths and state of current image being displayed
	for given model type.
	
public methods
	addImage - adds file name incl. path to the collection
	getImage - gets file name for current state
	inc - increments index of the state
************************************************************/
function imageData() {
	this.name = "";
	this.images = [];
	this.index = 0; // state of current image being displayed
	
	this.inc = function () {
		if (this.images.length == 1) { return; }
		
		this.index++;
		if (this.index >= this.images.length) { this.index = 0; }
	}
	
	this.addImage = function (image) {
		this.images.push(image);
	};
	
	this.getImage = function() {
		return this.images[this.index];
	};
};