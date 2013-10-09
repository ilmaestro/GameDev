//vector.js
var Game = Game || {};
Game.Vector = (function(Game){
	/**
	Creates a new vector
	**/
	function Vector(opt_x, opt_y){
		var x = opt_x || 0,
			y = opt_y || 0;
		this.x = x;
		this.y = y;
	}

	Vector.prototype.add = function(vector){
		this.x += vector.x;
		this.y += vector.y;
		return this;
	};

	Vector.prototype.sub = function (vector, vector2) {
		if(vector2) {
			var result = new Vector(vector.x, vector.y);
			return result.sub(vector2);
		} else {
			this.x -= vector.x;
			this.y -= vector.y;
			return this;
		}
	};

	Vector.prototype.mult = function(n) {
		this.x *= n;
		this.y *= n;
		return this;
	};

	Vector.prototype.multBy = function(vector) {
		this.x *= vector.x;
		this.y *= vector.y;
		return this;
	};

	Vector.prototype.div = function(n) {
		this.x = this.x / n;
		this.y = this.y / n;
		return this;
	};

	/**
   	* Calculates the magnitude of this vector.
   	*
   	* @returns {number} The vector's magnitude.
   	*/
	Vector.prototype.mag = function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	};

	Vector.prototype.angle = function() {
		return Math.atan2(this.y, this.x);
	};

	Vector.prototype.sqDistanceTo = function(point) {
		return (this.x - point.x) * (this.x - point.x) + (this.y - point.y) * (this.y - point.y);
	};

	/**
	* Limits the vector's magnitude.
	*
	* @param {number} opt_high The upper bound of the vector's magnitude
	* @param {number} opt_low The lower bound of the vector's magnitude.
	* @returns {Object} This vector.
	*/
	Vector.prototype.limit = function(opt_high, opt_low) {
		var high = opt_high || null,
			low = opt_low || null;

		if (high && this.mag() > high){
			this.normalize();
			this.mult(high);
		}

		if(low && this.mag() < low){
			this.normalize();
			this.mult(low);
		}
		return this;
	};

	Vector.prototype.normalize = function() {
		var m = this.mag();
		if(m !== 0) {
			return this.div(m);
		}
	};

	Vector.prototype.copyTo = function (vector) {
		vector.x = this.x * 1;
		vector.y = this.y * 1;
		return vector;
	};

	Vector.prototype.clone = function () {
		return new Vector(this.x, this.y);
	};

	Vector.prototype.rotate = function(radians) {
		var cos = Math.cos(radians),
			sin = Math.sin(radians),
			x = this.x,
			y = this.y;

		this.x = x * cos - y * sin;
		this.y = x * sin + y * cos;
		return this;
	};

	return Vector;
}(Game));