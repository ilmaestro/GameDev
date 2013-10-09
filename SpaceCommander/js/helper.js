var Game = Game || {};
Game.Helper = (function(Game){
	var Helper = {};

	/*
	*
	* simple sprite creation via offscreen canvas
	*
	*/


	Helper.drawLauncherArrow = function (context, source, target, limit) {
		var diff = target.clone().sub(source).limit(limit),
			dest = diff.clone().add(source),
			x = source.x,
        	y = source.y,
        	tx = dest.x,
        	ty = dest.y

        var	a1 = diff.clone().normalize().rotate(3 * Math.PI/4).mult(25).add(dest),
			a2 = diff.clone().normalize().rotate(-3 * Math.PI/4).mult(25).add(dest), 
			color = "Red",
			mag = diff.mag();

		if(mag < (limit * .25)) {
			color = "Green";
		} else if (mag >= (limit * .25) && mag < (limit * .5)) {
			color = "Yellow";
		} else if (mag >= (limit * .5) && mag < (limit * .75)) {
			color = "Orange";
		} 

		context.beginPath();
		context.arc(x, y, 2, 0, 2 * Math.PI);
    	context.moveTo(x, y);
    	context.lineTo(tx, ty);
    	context.lineTo(a1.x, a1.y);
    	context.moveTo(tx, ty);
    	context.lineTo(a2.x, a2.y);

    	context.strokeStyle = color;
    	context.lineWidth = 2;
    	context.stroke();
    	context.closePath();
	};

	Helper.moveSpriteWithBounds = function (move, sprite, bounds, moveSprite) {
		var x = sprite.x + move.x, y = sprite.y + move.y;

		//off to the left
		if(sprite.x - sprite.width < bounds.x) {
        	x = (bounds.right - sprite.width);
        }
        //off to the right
        if(sprite.x + sprite.width > bounds.right) {
        	x = (bounds.x + sprite.width);
        }
        //off to the top
		if(sprite.y - sprite.height < bounds.y ) {
        	y = (bounds.bottom - sprite.height);
        }
        //off to the bottom
		if(sprite.y + sprite.height > bounds.bottom) {
        	y = (bounds.y + sprite.height);
        }

        if(moveSprite) {
        	sprite.moveTo(x, y);
        }

        return {
        	x: x,
        	y: y
        };
	};

	Helper.moveSpriteWithBounce = function (velocity, sprite, bounds, bounce, offset) {
		var sRect 	= sprite.rect(),
			left 	= bounds.x + offset,
			right 	= bounds.right - offset,
			top 	= bounds.y + offset,
			bottom 	= bounds.bottom - offset;

		//off to the left or right
		if(sRect.x + velocity.x < left || sRect.right + velocity.x > right) {
			//sprite.setX(Helper.clipValue(sprite.x, left, right, offset));
        	velocity.x *= -bounce;
        }
        
        //off to the top or bottom
		if(sRect.y + velocity.y < top || sRect.bottom + velocity.y > bottom) {
			//sprite.setY(Helper.clipValue(sprite.y, top, bottom, offset));
			velocity.y *= -bounce;
        }

    	sprite.move(velocity.x, velocity.y);
	};

	Helper.clipValue = function (value, lower, upper, offset) {
		if(value < lower + offset) {
			value = lower + offset;
		} else if (value > upper - offset) {
			value = upper - offset;
		}

		return value;
	};

	Helper.totalForces = function (point, obstacles) {
	   var force = new Game.Vector();

	   for(var i = 0; i < obstacles.length; i++) {
			var obstacleForce = Helper.getForce(point, obstacles[i]);
			force.add(obstacleForce);
	   }
	   return force;
	};

	Helper.getForce = function (point, obstacle) {
		var point2 = new Game.Vector(obstacle.x, obstacle.y),
			magnitude = obstacle.mass / point2.sqDistanceTo(point),
			direction = point2.sub(point);

			direction.normalize().mult(magnitude).limit(10); // maximum acceleration.
		return direction;
	}

	Helper.dottedArc = function(ctx,x,y,radius,startAngle,endAngle,anticlockwise, sections) {
		var g = Math.PI / sections, 
			sa = startAngle, 
			ea = startAngle + g;

		while(ea < endAngle) {
			ctx.beginPath();
			ctx.arc(x,y,radius,sa,ea,anticlockwise);
			ctx.stroke();
			sa = ea + g;
			ea = sa + g;
		}
	};

	Helper.dashedLineTo = function (ctx, fromX, fromY, toX, toY, pattern) {
		// Our growth rate for our line can be one of the following:
		//   (+,+), (+,-), (-,+), (-,-)
		// Because of this, our algorithm needs to understand if the x-coord and
		// y-coord should be getting smaller or larger and properly cap the values
		// based on (x,y).
		var lt = function (a, b) { return a <= b; };
		var gt = function (a, b) { return a >= b; };
		var capmin = function (a, b) { return Math.min(a, b); };
		var capmax = function (a, b) { return Math.max(a, b); };

		var checkX = { thereYet: gt, cap: capmin };
		var checkY = { thereYet: gt, cap: capmin };

		if (fromY - toY > 0) {
			checkY.thereYet = lt;
			checkY.cap = capmax;
		}
		if (fromX - toX > 0) {
			checkX.thereYet = lt;
			checkX.cap = capmax;
		}

		ctx.moveTo(fromX, fromY);
		var offsetX = fromX;
		var offsetY = fromY;
		var idx = 0, dash = true;

		while (!(checkX.thereYet(offsetX, toX) && checkY.thereYet(offsetY, toY))) {
			var ang = Math.atan2(toY - fromY, toX - fromX);
			var len = pattern[idx];

			offsetX = checkX.cap(toX, offsetX + (Math.cos(ang) * len));
			offsetY = checkY.cap(toY, offsetY + (Math.sin(ang) * len));

			if (dash) ctx.lineTo(offsetX, offsetY);
			else ctx.moveTo(offsetX, offsetY);

			idx = (idx + 1) % pattern.length;
			dash = !dash;
		}
	};


	return Helper;
}(Game));