/// <reference path="Interfaces/2d.ts" />
/// <reference path="Classes/Starfield.ts" />
/// <reference path="Interfaces/GameLayer.ts" />
/// <reference path="typings/jaws.d.ts" />
/// <reference path="Classes/Player.ts" />
module Game {

    export class BasicPlayState {
        layers: IGameLayer[];

        setup(): void {
            this.layers = [];
            this.layers.push(new Starfield(200, jaws.width, jaws.height, .3, .5, true));
            //this.layers.push(new Starfield(100, jaws.width, jaws.height, .5, 1, false));
            this.layers.push(new Starfield(50, jaws.width, jaws.height, .8, 2, false));
            this.layers.push(new Starfield(25, jaws.width, jaws.height, .9, 3, false));
            
            this.layers.push(new Classes.Player({ x: jaws.width / 2, y: jaws.height / 2 }));
        }

        update(): void {
            for (var i = 0; i < this.layers.length; i++){
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
            
        }

        draw(): void {
            jaws.clear();
            for (var i = 0; i < this.layers.length; i++) {
                this.layers[i].draw();
            }
        }
    }
}