function message() {
	this.text = null;
	this.isDisplayed = false;
	this.index = 0;
	this.displayAtIndex = 3;

	this.updateState = function () {
		if (this.isDisplayed) { return; }
	
		this.index++;
		if (this.index >= this.displayAtIndex) {
			this.isDisplayed = true;
			this.index = 0;
		};
	};
};