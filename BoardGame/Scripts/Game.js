/// <reference path="Interfaces/2d.ts" />
/// <reference path="Classes/Starfield.ts" />
/// <reference path="Interfaces/GameLayer.ts" />
/// <reference path="typings/jaws.d.ts" />
/// <reference path="Classes/Player.ts" />
var Game;
(function (Game) {
    var BasicPlayState = (function () {
        function BasicPlayState() {
        }
        BasicPlayState.prototype.setup = function () {
            this.layers = [];
            this.layers.push(new Starfield(200, jaws.width, jaws.height, .3, .5, true));

            //this.layers.push(new Starfield(100, jaws.width, jaws.height, .5, 1, false));
            this.layers.push(new Starfield(50, jaws.width, jaws.height, .8, 2, false));
            this.layers.push(new Starfield(25, jaws.width, jaws.height, .9, 3, false));

            this.layers.push(new Game.Classes.Player({ x: jaws.width / 2, y: jaws.height / 2 }));
        };

        BasicPlayState.prototype.update = function () {
            for (var i = 0; i < this.layers.length; i++) {
                this.layers[i].update();
            }
            //if(jaws.pressed("right")) {
            //    this.player.position.x += 1;
            //    this.player.move();
            //}
            //if (jaws.pressed("left")) {
            //    this.player.position.x -= 1;
            //    this.player.move();
            //}
            //if (jaws.pressed("up")) {
            //    this.player.position.y += 1;
            //    this.player.move();
            //}
            //if (jaws.pressed("down")) {
            //    this.player.position.y -= 1;
            //    this.player.move();
            //}
        };

        BasicPlayState.prototype.draw = function () {
            jaws.clear();
            for (var i = 0; i < this.layers.length; i++) {
                this.layers[i].draw();
            }
        };
        return BasicPlayState;
    })();
    Game.BasicPlayState = BasicPlayState;
})(Game || (Game = {}));
//# sourceMappingURL=Game.js.map
