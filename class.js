/*
Helper method to setup inheritance of objects
Parameters
	derived - derived class we want to decorate with base class functionality
	base - base class that should be used as parent type of derived class.
		   when calling ctor from derived class, note you shall not use
		   this.baseCtor but [name].baseCtor.call(this) where [name] is 
		   name of your class. Statement "call(this)" ensures that context
		   of the method (parent ctor) is called in context of current (derived)
		   instance. See also documenation for javascript "call" and "apply" for
		   more details (e.g. passing parameters).
**********************************************/
function setupInheritance(derived, base)
{
	derived.prototype = new base();
	derived.baseCtor = base;
}