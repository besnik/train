/*
levelRepository class
	loads level data for given name
*********************************************/
function levelRepository(config) {
	if (typeof config !== "object") { throw new Error("Config was not provided!"); }
	this.config = config;

	this.load = function (name) {
		var l = null;
		
		// load level data
		switch(name) {
			case "test level":
				l = this.loadTestLevel();
				break;
		};
		
		// build view model
		if (l !== null) { this.buildViewModel(l); };
		
		return l;
	};
	
	this.loadTestLevel = function() {
		var l = new level();
		
		// level data
		l.name = "test level";
		l.sizeX = 8;
		l.sizeY = 6;
		l.config = this.config;
		
		// train data
		var t = new train();
		t.x = 3;
		t.y = 2;
		l.train = t;
		
		// walls data
		var walls = [];
		for (var x = 0; x < l.sizeX; x++) {
			// build top wall
			var w = new wall();
			w.x = x;
			w.y = 0;
			walls.push(w);
			
			// build bottom wall
			var w = new wall();
			w.x = x;
			w.y = l.sizeY - 1;
			walls.push(w);
		};
		for (var y = 1; y < l.sizeY - 1; y++) {
			// build left wall
			var w = new wall();
			w.x = 0;
			w.y = y;
			walls.push(w);
			
			// build right wall
			var w = new wall();
			w.x = l.sizeX - 1;
			w.y = y;
			walls.push(w);
		};
		l.walls = walls;
		
		return l;
	};
	
	this.buildViewModel = function (l) {
		var viewModel = {};
		
		viewModel.sizeX = l.sizeX;
		viewModel.sizeY = l.sizeY;
		
		var items = [];
		for (var key in l.walls) { 
			var w = l.walls[key];
			items.push(w); 
		}
		items.push(l.train);
		viewModel.items = items;
		
		l.viewModel = viewModel;
	};
}