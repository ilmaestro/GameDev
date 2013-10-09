var Game = Game || {};
Game.Explosion = (function(Game){
	function Explosion(options){
		var self = this;
		this.anim = new jaws.Animation({
			sprite_sheet: "explosion_2.png", 
			frame_size: [64,64], 
			frames: 24,
			orientation: "right",
			frame_duration: 70,
			loop: false,
			on_end: function(){
				self.onAnimEnd.call(self);
			}
		});
		options.image = this.anim.currentFrame();
		options.anchor = "center";
		jaws.Sprite.call(this, options);

		// state
		this.isActive = false;
	}

	Explosion.prototype = new jaws.Sprite({});

	Explosion.prototype.beginAnim = function(x,y){
		this.isActive = true;
		this.anim.index = 0; // rewind
		this.moveTo(x, y);
	};

	Explosion.prototype.onAnimEnd = function(){
		this.isActive = false;
		this.anim.index = 0; // rewind
	};

    Explosion.prototype.update = function() {
    	if(!this.isActive) {
    		return;
    	}

    	this.setImage(this.anim.next());
    };

    Explosion.prototype.drawFrame = function(viewport) {
    	if(!this.isActive) {
    		return;
    	}
    	viewport.draw(this);
    };


	return Explosion;
}(Game));