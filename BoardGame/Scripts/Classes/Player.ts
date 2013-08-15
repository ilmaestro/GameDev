/// <reference path="../Interfaces/GameLayer.ts" />
/// <reference path="../typings/jaws.d.ts" />
/// <reference path="../Interfaces/2d.ts" />
module Game.Classes {
    import gfx = Game.Interface2d;

    export class Player implements IGameLayer {
        private playerSprite: Sprite;
        private isMoving: boolean;
        private moveTime: number;
        private playerWidth: number;
        private playerHeight: number;

        xVelocity: number = 0;
        yVelocity: number = 0;
        speed: number = 3;
        defaultImage: string = "penguin1_1.png";
        moveDelay: number = 20;

        constructor(public position: gfx.IPoint) {
            this.playerSprite = new jaws.Sprite({ image: this.defaultImage, x: this.position.x, y: this.position.y, scale: .1, anchor: "center" });
            this.playerSprite.setHeight(65);
            this.playerSprite.setWidth(75);
            this.isMoving = false;
            this.moveTime = 0;
            this.playerWidth = this.playerHeight = 75;
        }

        update(): void {
            if (!this.isMoving && jaws.pressed("right")) {
                this.isMoving = true;
                this.xVelocity = this.speed;
            }
            if (!this.isMoving && jaws.pressed("left")) {
                this.isMoving = true;
                this.xVelocity = -this.speed;
            }
            if (!this.isMoving && jaws.pressed("up")) {
                this.isMoving = true;
                this.yVelocity = -this.speed;
            }
            if (!this.isMoving && jaws.pressed("down")) {
                this.isMoving = true;
                this.yVelocity = this.speed;
            }


            if (this.isMoving) {
                this.position.x += this.xVelocity;
                this.position.y += this.yVelocity;
                if (this.position.x >= (jaws.width - this.playerWidth))
                    this.position.x = jaws.width - this.playerWidth;
                if (this.position.y >= (jaws.height - this.playerHeight))
                    this.position.y = jaws.height - this.playerHeight;
                if (this.position.x <= 0)
                    this.position.x = 0;
                if (this.position.y <= 0)
                    this.position.y = 0;

                this.playerSprite.x = this.position.x;
                this.playerSprite.y = this.position.y;
                this.playerSprite.rotate(this.speed * this.xVelocity);
                this.moveTime++;
                //console.log(this.moveTime);
            }

            if (this.moveTime > this.moveDelay) {
                this.moveTime = 0;
                this.isMoving = false;
                this.xVelocity = 0;
                this.yVelocity = 0;
                //console.log("stopped");
            }
            
        }

        draw(): void {            
            this.playerSprite.draw();
        }
    }
}