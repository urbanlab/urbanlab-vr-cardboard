PhotoSphere.prototype = Object.create(THREE.Object3D.prototype);
PhotoSphere.prototype.constructor = PhotoSphere;

function PhotoSphere(rootThis, textureObject, args) {
	args = args || {};
	
	/*
	var image = new Image();
	image.src = textureUrl;
	image.onload = function(){
  	*/
  	
  	var texture = textureObject;
        texture.minFilter = THREE.LinearFilter;
  
  	var sphere = new THREE.Mesh(
  		new THREE.SphereGeometry(args.depth || 50, 32, 32),
  		new THREE.MeshBasicMaterial({
  			map: texture, transparent: args.transparent || false, opacity: 0.5
  		})
  	);
  	
  	// Invert the mesh inside-out
  	sphere.scale.x = -1;
  	sphere.rotation.y = args.looky || 0;
  	
  	this.sphere = sphere;
  	
  	rootThis.add(this.sphere);
  	
//  }
    	
	this.remove = function(){
		rootThis.remove(this.sphere);
	}
}
	
