/*
train class
	holds locomotive and wagons
**********************************/
function train(locomotive) {
	if (typeof locomotive === "undefined") { throw new Error("Locomotive input parameter is mandatory!"); }
	this.locomotive = locomotive;
	this.wagons = [];
}