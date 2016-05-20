DetailImage.prototype = Object.create(THREE.Object3D.prototype);
DetailImage.prototype.constructor = DetailImage;

function DetailImage(rootThis, texture, args) {
	THREE.Object3D.call(this);

  texture.minFilter = THREE.LinearFilter;
  
	var geometry = new THREE.PlaneBufferGeometry(texture.image.width / args.scale || 100, texture.image.height / args.scale || 100);

	var material = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: true, 
		opacity: 1.0
	});
	
	var mesh = new THREE.Mesh(geometry, material);
	
	this.mesh = mesh;
	
	this.add(mesh);
	
	this.args = args;
	this.degree = args.degree;
	
	args.enableFocus = (args.enableFocus != undefined) ? args.enableFocus : true;
	
	this.hasFocusEnabled = args.enableFocus;
	
	this.updatePosition = function(){
		var phi = (this.args.verticalDegree)*Math.PI/180;
		var theta = (this.args.degree-180)*Math.PI/180;
		
		this.position.x = -this.args.radius * Math.cos(phi) * Math.cos(theta);
		this.position.y = this.args.radius * Math.sin(phi) + (args.y || 0);
		this.position.z = this.args.radius * Math.cos(phi) * Math.sin(theta);
		
		this.lookAt(cardboard.camera.position);
	}
	this.updatePosition();
	
	rootThis.add(this);
	

	if (this.hasFocusEnabled) {
  	this.onFocus = args.onFocus;
  	this.onBlur = args.onBlur;
	}
	
	this.triggerOn = function() {
  	if (this.hasFocusEnabled) {
    	if (this.onFocus != undefined || this.onBlur != undefined){
  		  rootThis.intersectables.push(this.children[0]);
    	}
  	}
	}
	
	this.triggerOff = function() {
  	if (this.hasFocusEnabled) {
    	if (this.onFocus != undefined || this.onBlur != undefined){
  			rootThis.intersectables.splice($.inArray(this.children[0], rootThis.intersectables),1);
    	}
  	}
	}
	
	if (this.hasFocusEnabled) {
	  this.triggerOn();
	}
	
	this.remove = function(){
		// Remove from intersectables
		if (args.onFocus != undefined || args.onBlur != undefined){
			rootThis.intersectables.splice($.inArray(this.children[0], rootThis.intersectables),1);
		}
		// Remove from scene
		rootThis.remove(this);
		rootThis.remove(this.mesh);
	}
	
}


