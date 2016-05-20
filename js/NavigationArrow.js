
NavigationArrow.prototype = Object.create(THREE.Object3D.prototype);
NavigationArrow.prototype.constructor = NavigationArrow;

function NavigationArrow(rootThis, args) {
	this.arrow = new DetailImage(rootThis, args.texturePin, {
		radius: 25,
		degree: args.degree,
		verticalDegree: args.verticalDegree || -10,
		scale: args.scale || 250,
		onFocus: args.onFocus
	});
	
	this.remove = function(){
		this.arrow.remove();
	}
}
