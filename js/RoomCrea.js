RoomCrea.prototype = Object.create(THREE.Object3D.prototype);
RoomCrea.prototype.constructor = RoomCrea;
	
function RoomCrea(scene, args){
  args = args || {};
  
	THREE.Object3D.call(this);
	var RoomCrea = this;
	scene.room = this;
	
	this.photoSphere = new PhotoSphere(scene, textures['PanoCrea'].texture, {
  	looky: 2.85
	});
	
	args.looky = args.looky || 2.85;
	
	if (scene.showAugmentedVideos) {
  	RoomCrea.vid1 = new Video(scene, {
  		videoIdDOM:'videoRectoVerso',
  		degree: -201.8,
  		verticalDegree: 0,
  		radius: 17,
  		y: -2.2,
  		scale: .04,
    	positionx:2,
    	positiony:-1,
    	positionz:10,
    	rotationy:-90.8,
    	rotationx:0,
    	onBlur: function() {
      	RoomCrea.img1.triggerOn();
      	this.hide();
    	}
  	});
  	
  	RoomCrea.vid2 = new Video(scene, {
  		videoIdDOM:'videoEvolyon',
  		degree: 356,
  		verticalDegree: 3,
  		radius: 20,
  		y: -1.5,
  		scale: .045,
    	positionx:2,
    	positiony:-1,
    	positionz:10,
    	rotationy:-90.8,
    	rotationx:0,
    	onBlur: function() {
      	RoomCrea.img2.triggerOn();
      	this.hide();
    	}
  	});
	}
	
	RoomCrea.img1 = new DetailImage(scene, textures['LabelRectoVerso'].texture, {
		scale: 110,
		degree: -201.8,
		verticalDegree: 0,
		radius: 30,
		y: -2.2,
		enableFocus: scene.showAugmentedVideos,
		onFocus: function() {
			if (!RoomCrea.vid1.isVisible()) {
  			RoomCrea.vid1.show();  	
    		
    		this.triggerOff();	
  		}	
		}
	});
		
	RoomCrea.img2 = new DetailImage(scene, textures['LabelEvolyon2'].texture, {
		scale: 100,
		degree: 356,
		verticalDegree: 0,
		radius: 40,
		y: -1.5,
		enableFocus: scene.showAugmentedVideos,
		onFocus: function() {
			if (!RoomCrea.vid2.isVisible()) {
  			RoomCrea.vid2.show();  	
    		
    		this.triggerOff();	
  		}	
		}
	});
		
	RoomCrea.img4 = new DetailImage(scene, textures['TextCrea'].texture, {
		scale: 100,
		degree: 0.8,
		verticalDegree: 0,
		radius: 25,
		y: 8
	});
		
		
		
	RoomCrea.img7 = new DetailImage(scene, textures['urbanLAB'].texture, {
		scale: 20,
		degree: -0,
		verticalDegree: 0,
		radius: 10,
		y: -40
	});
	

	RoomCrea.img10 = new NavigationArrow(scene, {
  	texturePin: textures['Pin'].texture,
		degree: -32,
		verticalDegree: -7,
		verticalOffset: -10,
		scale:150,
		onFocus: function(){
			// remove the room
			RoomCrea.remove();
			// Start a new room
			new RoomCenter(scene, {
				looky: 20
			});
		}
	});

	this.remove = function(){
		this.photoSphere.remove();
		
		for (var i=1;i<42;i++) {
			if (RoomCrea["img"+i] != undefined) {
				RoomCrea["img"+i].remove();
			}
			if (RoomCrea["vid"+i] != undefined) {
				RoomCrea["vid"+i].remove();
			}
		}
		
		// remove self
		scene.removeRoom(this);
	}
	
}