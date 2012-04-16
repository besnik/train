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
		
		// locomotive
		var loc = new locomotive();
		loc.x = 3;
		loc.y = 2;
		
		// train
		var t = new train(loc);
		l.train = t;
		
		// gate
		var g = new gate();
		g.x = 1;
		g.y = 4;
		l.gate = g;
		
		// jewels
		var jewels = [];
		
		var j = new levelItem();
		j.x = 4;
		j.y = 2;
		j.type = "jewel"
		jewels.push(j);
		
		l.jewels = jewels;
		
		// walls data
		var walls = [];
		for (var x = 0; x < l.sizeX; x++) {
			// build top wall
			var w = new levelItem();
			w.type = "wall";
			w.x = x;
			w.y = 0;
			walls.push(w);
			
			// build bottom wall
			var w = new levelItem();
			w.type = "wall";
			w.x = x;
			w.y = l.sizeY - 1;
			walls.push(w);
		};
		for (var y = 1; y < l.sizeY - 1; y++) {
			// build left wall
			var w = new levelItem();
			w.type = "wall";
			w.x = 0;
			w.y = y;
			walls.push(w);
			
			// build right wall
			var w = new levelItem();
			w.type = "wall";
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
		
		// walls
		for (var key in l.walls) { 
			var w = l.walls[key];
			items.push(w); 
		}
		
		// locomotive
		items.push(l.train.locomotive);
		
		// gate
		items.push(l.gate);
		
		// jewels
		for (var key in l.jewels) {
			var j = l.jewels[key];
			items.push(j); 
		}
		
		viewModel.items = items;
		l.viewModel = viewModel;
	};
}
