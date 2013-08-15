/// <reference path="Player.ts" />
/// <reference path="typeings/jaws.d.ts" />

module Game {

    export class gameState {
        player: Classes.Player;

        setup(): void {
            this.player = new Classes.Player();
        }

        update(): void {

        }

        draw(): void {
            jaws.clear();
            this.player.draw();
        }
    }
}
jaws.start(Game.gameState);
