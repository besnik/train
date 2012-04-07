/*
train class
	holds locomotive and wagons
**********************************/
function train(locomotive) {
	if (typeof locomotive === "undefined") { throw new Error("Locomotive input parameter is mandatory!"); }
	this.locomotive = locomotive;
	this.wagons = [];
	
	this.move = function () {
		var w = this.wagons;
		var l = this.locomotive;
		
		if (w.length > 0) {
			// 1. set position in following order: w[i] = w[i-1]
			if (w.length > 1) {
				for (var i = w.length - 1; i > 0; i--) {
					w[i].setPositionFrom(w[i-1]);
				};
			};
			
			// 2. set position w[0] = locomotive
			w[0].setPositionFrom(l);
		};
	
		// 3. locomotive moves as last item
		l.move();
	};
	
	this.setPosition = function (source, destination) {
		destination.x = source.x;
		destination.y = source.y;
		destination.direction = source.direction;
	};
	
	this.addWagon = function(w) { this.wagons.push(w);	};
	
	this.getLastWagonPosition = function () {
		var w = null;
		if (this.wagons.length === 0) {
			w = this.locomotive;
		} else {
			w = this.wagons[this.wagons.length - 1];
		};
		
		// return new instance as train position will be modified during movement
		return {
			x: w.x,
			y: w.y,
			direction: w.direction
		};
	};
}