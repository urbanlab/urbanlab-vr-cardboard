RoomShowroom.prototype = Object.create(THREE.Object3D.prototype);
RoomShowroom.prototype.constructor = RoomShowroom;

function RoomShowroom(scene){
	THREE.Object3D.call(this);
	var RoomShowroom = this;
	scene.room = this;
	
	this.photoSphere = new PhotoSphere(scene, textures['PanoShowroom'].texture, {
  	looky: 2.85
	});

	if (scene.showAugmentedVideos) {
  	RoomShowroom.vid1 = new Video(scene, {
  		videoIdDOM:'videoFunkytown',
  		degree: -219,
  		verticalDegree: 0,
  		radius: 18,
  		y: -7.1,
  		scale: .04,
    	positionx:2,
    	positiony:-1,
    	positionz:10,
    	rotationy:-90.8,
    	rotationx:0,
    	onBlur: function() {
      	RoomShowroom.img1.triggerOn();
      	this.hide();
    	}
  	});
  	
  	RoomShowroom.vid2 = new Video(scene, {
  		videoIdDOM:'videoProxemie',
  		degree: 70,
  		verticalDegree: 10,
  		radius: 21,
  		y: -11.5,
  		scale: .055,
    	positionx:2,
    	positiony:-1,
    	positionz:10,
    	rotationy:-90.8,
    	rotationx:0,
    	onBlur: function() {
      	RoomShowroom.img2.triggerOn();
      	this.hide();
    	}
  	});
  	
  	RoomShowroom.vid3 = new Video(scene, {
  		videoIdDOM:'videoHackagate',
  		degree: -14,
  		verticalDegree: 10,
  		radius: 16,
  		y: -9.0,
  		scale: .045,
    	positionx:2,
    	positiony:-1,
    	positionz:10,
    	rotationy:-90.8,
    	rotationx:0,
    	onBlur: function() {
      	RoomShowroom.img3.triggerOn();
      	this.hide();
    	}
  	});
	}
	
	
	
	
	
	RoomShowroom.img10 = new DetailImage(scene, textures['Pin'].texture, {
		degree: -128,
		verticalDegree: -10,
		verticalOffset: -3,
		scale:100,
		radius: 25,
		onFocus: function() {
			/*
			if (!RoomShowroom.vid1.isVisible()) {
  			RoomShowroom.vid1.show();  
  		}	
  		*/
  		
			// remove the room
			RoomShowroom.remove();
			// Start a new room
			new RoomCenter(scene, {
				looky: 30
			});
		}
	});
	
	
	
	
	
	
	RoomShowroom.img1 = new DetailImage(scene, textures['LabelFunkyTown'].texture, {
		scale: 100,
		degree: -219,
		verticalDegree: 0,
		radius: 22,
		y: -8.7,
		enableFocus: scene.showAugmentedVideos,
		onFocus: function() {
			if (!RoomShowroom.vid1.isVisible()) {
  			RoomShowroom.vid1.show();  	
    		
    		this.triggerOff();	
  		}	
		}
	});
	
	RoomShowroom.img2 = new DetailImage(scene, textures['LabelProxemie'].texture, {
		scale: 130,
		degree: 70,
		verticalDegree: 10,
		radius: 24,
		y: -11.5,
		enableFocus: scene.showAugmentedVideos,
		onFocus: function() {
			if (!RoomShowroom.vid2.isVisible()) {
  			RoomShowroom.vid2.show();  	
    		
    		this.triggerOff();	
  		}	
		}
	});
	
	RoomShowroom.img3 = new DetailImage(scene, textures['LabelHackagate'].texture, {
		scale: 130,
		degree: -14,
		verticalDegree: 10,
		radius: 18,
		y: -10.0,
		enableFocus: scene.showAugmentedVideos,
		onFocus: function() {
			if (!RoomShowroom.vid3.isVisible()) {
  			RoomShowroom.vid3.show();  	
    		
    		this.triggerOff();	
  		}	
		}
	});
	
	
		
	RoomShowroom.img5 = new DetailImage(scene, textures['TextShowroom'].texture, {
		scale: 70,
		degree: 85.8,
		verticalDegree: 0,
		radius: 25,
		y: 6
	});
		
	RoomShowroom.img6 = new DetailImage(scene, textures['TextFab'].texture, {
		scale: 100,
		degree: -162.8,
		verticalDegree: 0,
		radius: 25,
		y: 7
	});
		
		
		
	RoomShowroom.img7 = new DetailImage(scene, textures['urbanLAB'].texture, {
		scale: 20,
		degree: -162.8,
		verticalDegree: 0,
		radius: 10,
		y: -40
	});
	
	
	/*
	THREE.ImageUtils.loadTexture('images/LabelTextFunkyTown.svg', undefined, function(texture){
		RoomShowroom.img2 = new DetailImage(scene, texture, {
			scale: 100,
			degree: -76,
			verticalDegree: 0,
			radius: 22,
			y: 1
		});
	});
	*/

	this.remove = function(){
		this.photoSphere.remove();
		
		for (var i= 1; i < 42; i++) {
			if (RoomShowroom["img"+i] != undefined) {
				RoomShowroom["img"+i].remove();
			}
			if (RoomShowroom["vid"+i] != undefined) {
				RoomShowroom["vid"+i].remove();
			}
		}
		
		// remove self
		scene.removeRoom(this);
	}
	
}