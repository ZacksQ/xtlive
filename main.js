function Hooks(){
	this.queue = [];
}

Hooks.prototype.addAction = function(){
	console.log(this);
}

var h1 = new Hooks();
h1.addAction();