Video.prototype = Object.create(THREE.Object3D.prototype);
Video.prototype.constructor = Video;

function Video(rootThis, args) {
  THREE.Object3D.call(this);

  args = args || {};
  
  this.active = false;
	
	this.render = function() {
		
		if ( this.video.readyState === this.video.HAVE_ENOUGH_DATA ) {
			this.imageContext.drawImage( this.video, 0, 0 );
			if ( this.texture ) this.texture.needsUpdate = true;
		}
	}
	
	this.animate = function() {
  	if (this.active == true) {
  		requestAnimationFrame( this.animate.bind(this) );
  		this.render();
		}
	}
	
	this.isVisible = function() {
  	return this.active;
	}
	
	this.videoIdDOM = args.videoIdDOM;
	
	this.video = document.getElementById( args.videoIdDOM );
	/*
	video = document.createElement('video');
	video.src = args.videoUrl;	
  */
	this.video.setAttribute('crossorigin', 'anonymous');
	
	this.image = document.createElement( 'canvas' );
	this.image.width = 640;
	this.image.height = 360;
	this.imageContext = this.image.getContext( '2d' );
	this.imageContext.fillStyle = '#000000';
	this.imageContext.fillRect( 0, 0, this.image.width, this.image.height );
	
	this.texture = new THREE.Texture( this.image );
	this.texture.minFilter = THREE.LinearFilter;
	
	this.material = new THREE.MeshBasicMaterial( { map: this.texture, overdraw: 0.5 } );
	
	this.plane = new THREE.PlaneBufferGeometry( this.image.width, this.image.height, 4, 4 );
	
	this.mesh = new THREE.Mesh( this.plane, this.material );
	
	this.add(this.mesh);
	
	this.scaleVisible = args.scale || .02;
	this.currentScale = this.scaleVisible;
	
	this.radiusVisible = args.radius || .02;
	this.currentRadius = this.radiusVisible;
	
	
	rootThis.add(this);
	
	

	
	this.rewindToStart = function() {
  	this.video.currentTime = 0;
  	this.video.pause();
	}
	
	this.play = function() {
  	this.video.play();  	
	}
	
	
	
	
  this.args = args;
	this.degree = args.degree;
	
	this.updatePosition = function(){
		var phi = (this.args.verticalDegree)*Math.PI/180;
		var theta = (this.args.degree-180)*Math.PI/180;
		
    this.scale.x = this.scale.y = this.scale.z = this.currentScale || .02;
		
		this.position.x = -this.currentRadius * Math.cos(phi) * Math.cos(theta);
		this.position.y = this.currentRadius * Math.sin(phi) + (args.y || 0);
		this.position.z = this.currentRadius * Math.cos(phi) * Math.sin(theta);
		
		this.lookAt(cardboard.camera.position);
	}
	
	
	this.onFocus = args.onFocus;
	this.onBlur = args.onBlur;
	
	this.triggerOn = function() {
  	if (this.onFocus != undefined || this.onBlur != undefined){
		  rootThis.intersectables.push(this.children[0]);
  	}
	}
	
	this.triggerOff = function() {
  	if (this.onFocus != undefined || this.onBlur != undefined){
			rootThis.intersectables.splice($.inArray(this.children[0], rootThis.intersectables),1);
  	}
	}
	
  
  this.show = function() {
    this.play();
    this.active = true;
    this.animate();
    this.triggerOn();
    this.currentRadius = this.radiusVisible;
    this.updatePosition();
  //  this.material.visible = true;
  }
  
  this.hide = function() {
    this.rewindToStart();
    this.active = false;
    this.triggerOff();
    this.currentRadius = 60;
    this.updatePosition();
  //  this.material.visible = false;
  }
  
  this.hide();
	
	this.updatePosition();
			
  this.lookAt(cardboard.camera.position);
	
	
	this.remove = function(){
  	document.getElementById(this.videoIdDOM).pause();
  	
		// Remove from intersectables
		if (args.onFocus != undefined || args.onBlur != undefined){
			rootThis.intersectables.splice($.inArray(this.children[0], rootThis.intersectables),1);
		}
		// Remove from scene
		rootThis.remove(this.image);
		rootThis.remove(this.mesh);
		rootThis.remove(this);
	}
	
}


