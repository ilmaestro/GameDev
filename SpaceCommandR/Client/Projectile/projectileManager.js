var Game = Game || {};
Game.ProjectileManager = (function(Game){
	function ProjectileManager(options){
	    this.bounds = options.bounds || new jaws.Rect({});
	    this.bounds.shrink(10, 10);
	    this.bounds.moveTo(30, 30);

	    this.projectiles = [];
	    this.projectileCount = 0;
	}

	ProjectileManager.prototype.spawn = function(options){
	    options.x = options.x || 0;
	    options.y = options.y || 0;
	    options.isAlive = options.isAlive || false;
	    options.radius = options.radius || 8;
	    options.bounds = options.bounds || new jaws.Rect({});
	    options.mass = options.mass || 100;
	    options.parentStation = options.parentStation || "";
	    options.ancor = "center";

	    this.projectiles.push(new Game.Projectile(options));
	    this.projectileCount++;
	}

	ProjectileManager.prototype.remove = function (index) {
	    this.projectileCount--;
	    this.projectiles.splice(index, 1);
	};

    ProjectileManager.prototype.update = function(viewport, stations, planets, onCollisionCallback) {
        var i = 0, self = this;
        for (i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].isAlive) {
                //get forces, add them to velocity
                var force = Game.Helper.totalForces(this.projectiles[i], planets);
                this.projectiles[i].velocity.add(force);
                this.projectiles[i].update();

                //adjust the viewport to follow the projectile
                viewport.centerAround(this.projectiles[i]);

                //detect if inside bounds
                if (!this.projectiles[i].rect().collideRect(this.bounds)) {
                    onCollisionCallback("bounds", self.projectiles[i], self.bounds);
                    self.projectiles[i].isAlive = false;
                }

                //detect if project collides with planets
                doIfCollideCircles(this.projectiles[i], planets, function (planet) {
                    onCollisionCallback("planet", self.projectiles[i], planet);
                    self.projectiles[i].isAlive = false;
                });

                //detect if collided with stations
                jaws.collideOneWithMany(this.projectiles[i], stations, function(projectile, station){
                    if(self.projectiles[i].parentStation != station.name) {
                        onCollisionCallback("station", self.projectiles[i], station);
                        self.projectiles[i].isAlive = false;
                    }
                });
                if (!this.projectiles[i].isAlive) {
                    self.remove(i);
                }
            } else {
                this.remove(i);
                return;
            }
        }
    };

    ProjectileManager.prototype.draw = function (viewport) {
        var i = 0;
        for (i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].isAlive) {
                viewport.draw(this.projectiles[i]);
            }
        }
    };

    function doIfCollideCircles(obj1, objects, callback) {
        var i = 0;
        for(i = 0; i < objects.length; i ++) {
            if(jaws.collideCircles(obj1, objects[i])) {
                callback.call(this, objects[i]);
            }
        }
    }

	return ProjectileManager;
}(Game));