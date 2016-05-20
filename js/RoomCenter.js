RoomCenter.prototype = Object.create(THREE.Object3D.prototype);
RoomCenter.prototype.constructor = RoomCenter;
	
function RoomCenter(scene, args){
  args = args || {};
  
	THREE.Object3D.call(this);
	var RoomCenter = this;
	scene.room = this;
	
	this.photoSphere = new PhotoSphere(scene, textures['PanoCenter'].texture, {
  	looky: 2.85
	});
	
	args.looky = args.looky || 2.85;
	
	if (scene.showAugmentedVideos) {
  	RoomCenter.vid1 = new Video(scene, {
  		videoIdDOM:'videoFunkytown',
  		degree: -56.8,
  		verticalDegree: 0,
  		radius: 19,
  		y: -5.8,
  		scale: .04,
    	positionx:2,
    	positiony:-1,
    	positionz:10,
    	rotationy:-90.8,
    	rotationx:0,
    	onBlur: function() {
      	RoomCenter.img1.triggerOn();
      	this.hide();
    	}
  	});
  	
  	RoomCenter.vid2 = new Video(scene, {
  		videoIdDOM:'videoEvolyon',
  		degree: 119.8,
  		verticalDegree: 10,
  		radius: 19,
  		y: -6.5,
  		scale: .055,
    	positionx:2,
    	positiony:-1,
    	positionz:10,
    	rotationy:-90.8,
    	rotationx:0,
    	onBlur: function() {
      	RoomCenter.img2.triggerOn();
      	this.hide();
    	}
  	});
	}
	
	RoomCenter.img1 = new DetailImage(scene, textures['LabelFunkyTown'].texture, {
		scale: 100,
		degree: -56.8,
		verticalDegree: 0,
		radius: 41,
		y: -8.2,
		enableFocus: scene.showAugmentedVideos,
		onFocus: function() {  		
			if (!RoomCenter.vid1.isVisible()) {
  			RoomCenter.vid1.show();  	
    		
    		this.triggerOff();	
  		}	
		}
	});
		
	RoomCenter.img2 = new DetailImage(scene, textures['LabelEvolyon'].texture, {
		scale: 100,
		degree: 119.8,
		verticalDegree: 0,
		radius: 25,
		y: -5,
		enableFocus: scene.showAugmentedVideos,
		onFocus: function() {
			if (!RoomCenter.vid2.isVisible()) {
  			RoomCenter.vid2.show();  	
    		
    		this.triggerOff();	
  		}	
		}
	});
		
	RoomCenter.img4 = new DetailImage(scene, textures['TextCrea'].texture, {
		scale: 100,
		degree: -159.8,
		verticalDegree: 0,
		radius: 25,
		y: 8
	});
		
	RoomCenter.img5 = new DetailImage(scene, textures['TextShowroom'].texture, {
		scale: 100,
		degree: -75.8,
		verticalDegree: 0,
		radius: 25,
		y: 13
	});
		
	RoomCenter.img6 = new DetailImage(scene, textures['TextFab'].texture, {
		scale: 100,
		degree: 5.8,
		verticalDegree: 0,
		radius: 25,
		y: 7
	});
	
	
		
		
		
	RoomCenter.img7 = new DetailImage(scene, textures['urbanLAB'].texture, {
		scale: 20,
		degree: -162.8,
		verticalDegree: 0,
		radius: 10,
		y: -40
	});
	

	RoomCenter.img10 = new NavigationArrow(scene, {
  	texturePin: textures['Pin'].texture,
		degree: -85,
		verticalDegree: -10,
		verticalOffset: -10,
		scale:100,
		onFocus: function(){
			// remove the room
			RoomCenter.remove();
			// Start a new room
			new RoomShowroom(scene, {
				looky: 20
			});
		}
	});

	

	RoomCenter.img11 = new NavigationArrow(scene, {
  	texturePin: textures['Pin'].texture,
		degree: -148,
		verticalDegree: -6,
		verticalOffset: -10,
		scale:120,
		onFocus: function(){
			// remove the room
			RoomCenter.remove();
			// Start a new room
			new RoomCrea(scene, {
				looky: 20
			});
		}
	});

	this.remove = function(){
		this.photoSphere.remove();
		
		for (var i=1;i<42;i++) {
			if (RoomCenter["img"+i] != undefined) {
				RoomCenter["img"+i].remove();
			}
			if (RoomCenter["vid"+i] != undefined) {
				RoomCenter["vid"+i].remove();
			}
		}
		
		// remove self
		scene.removeRoom(this);
	}
	
}