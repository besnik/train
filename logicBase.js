/* 
class logicBase
	base class for logic. contains functions common for multiple specialized logics.
	
	it is necessary to use .call or .apply methods to invoke methods to use correct context.
	
ctor parameters
	n/a
***************************/
function logicBase () {
	
	this.detectCrash = function (context, app) {
		// 1. get future train position
		// 2. detect crash with crashable objects (walls, train)
		// 3. crash (stop)
		
		var isCrashed = false;
		var locomotive = app.level.train.locomotive;
		var position = locomotive.getFuturePosition();
		var walls = app.level.walls;
		
		// check walls
		for (var i = 0; i < walls.length; i++) {
			if (this.isCollision(position, walls[i])) {
				isCrashed = true;
				break;
			};
		};
		
		return isCrashed;
	};
	
	this.isCollision = function (o1, o2) {
		return (o1.x === o2.x && o1.y === o2.y);
	};
}