var Game = Game || {};
Game.Grid = (function(Game){
	function Grid(options){
		var width = options.width || 500,
			height = options.height || 500,
			gridSize = options.gridSize || 100,
			offset = options.offset || 50;

		options.image = getGridImage(width, height, gridSize);

		jaws.Sprite.call(this, options);
	}

	Grid.prototype = new jaws.Sprite({});

    //Grid.prototype.constructor = Grid;

	function getGridImage(width, height, gridSize){
		//create an offscreen canvas
		var i = 0, canvas = document.createElement("canvas");

	    // liquid layout: stretch to fill
	    canvas.width = width;
	    canvas.height = height;
	    var ctx = canvas.getContext('2d');
		ctx.strokeStyle = "green";
		ctx.lineWidth = 1;
		ctx.globalAlpha=0.6;

	    for(i = gridSize; i <= width; i += gridSize) {
	    	ctx.beginPath();
			ctx.moveTo(i,0);
			ctx.lineTo(i,height);
			ctx.stroke();

			ctx.moveTo(0, i);
			ctx.lineTo(width, i);
			ctx.stroke();
	    }

	    ctx.beginPath();
        ctx.rect(0, 0, width, height);
       	ctx.strokeStyle = "green";
        ctx.lineWidth = 4;
        ctx.stroke();
	    return canvas;		
	}

	return Grid;
}(Game));