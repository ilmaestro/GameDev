/// <reference path="../Engine/Graphics/SpriteSheet.ts" />
/// <reference path="AlienShip.ts" />
/// <reference path="../Engine/Graphics/Sprite.ts" />
/// <reference path="../Engine/Graphics/SpriteRenderer.ts" />
/// <reference path="../Engine/GameWorld.ts" />
module Game {
    // Class
    export class SimpleGame extends Engine.GameWorld {
        spriteCollection: Engine.Graphics.SpriteCollection;

        //ship parameters
        alienShip: AlientShip;
        alienShip_offsetX = 79;
        alienShip_offsetY = 0;
        alienShip_startX = 10;
        alienShip_startY = 10;
        alienShip_width = 37;
        alienShip_height = 43;

        // Constructor
        constructor() {
            super();
        }

        setup(game: Engine.GameController) {
            var self = this;
            this.spriteCollection = new Engine.Graphics.SpriteCollection();
            self.alienShip = new AlientShip("AlienShip", self.alienShip_startX, self.alienShip_startY, self.alienShip_width, self.alienShip_height);
            self.spriteCollection.add(self.alienShip);
            var alientRect = new Engine.Graphics.Rectangle(self.alienShip_offsetX, self.alienShip_offsetY, self.alienShip_width, self.alienShip_height);
            
            game.contentManager.root = "game-media/";
            game.contentManager.loadImage("sprites.png").then(function (image: HTMLImageElement) {
                game.logger("spriteSheet loaded from: " + image.src);
                var spriteSheet = new Engine.Graphics.SpriteSheet(image);
                game.spriteRenderer.setSpriteSheet(spriteSheet);                
                game.spriteRenderer.spriteSheet.addFrame("AlienShip", alientRect, 1);
                self.ready(); //call ready function.
            });
        }

        update(game: Engine.GameController) {
            this.spriteCollection.updateAll(game);
            super.update(game);
        }

        draw(spriteRenderer: Engine.Graphics.SpriteRenderer) {
            this.spriteCollection.drawAll(spriteRenderer);
            super.draw(spriteRenderer);
        }

        ready(){}

    }

}
