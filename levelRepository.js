/*
levelRepository class
	loads level data for given name
*********************************************/
function levelRepository() {
	this.load = function (name) {
		var l = new level();
		
		l.name = "test level";
		l.train = new train();
		l.viewModel = { items: [ l.train ] };
		
		return l;
	};
}