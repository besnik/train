/*
class keyboard
binds given function to keyboard keydown event

ctor parameters:
	callback - function that is called when key is pressed
	callbackScope - instance object which contains callback

note: in original impl this type was implemented using jquery but as
	  jquery is changing 'this' sometimes in unpredictable ways (especialy in debugger),
	  I decided use it only for rendering in View. It also adds complexity to event handling.
	  It is a bit more work (:one line:) to handle all browsers, but saves some pain with scope changes.
	  And now we are independent of jquery.
************************************************************/
function keyboard(callback, callbackScope) {
	if (typeof callback !== "function") { throw new Error("callback parameter must be a function!"); }
	if (typeof callbackScope !== "object") { throw new Error("callbackScope parameter must be an object!"); }
	
	document.onkeydown = function (e) {
    if (typeof e === "undefined") { e = window.event; } // ie fix
		var key =  ("which" in e) ? e.which : e.keyCode;
		callback.call(callbackScope, { which: key }); // set "this" to right context for callback execution
	}
	
	/* ORIGINAL implementation using jQuery */
	// jquery is changing 'this' object. We need to restore original scope of the callback. callbackScope was method parameter.
	//$(document).keydown($.proxy(callback, callbackScope));
}


