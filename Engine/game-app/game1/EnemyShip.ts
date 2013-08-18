/// <reference path="../Engine/Component/SpriteSet.ts" />
/// <reference path="../Engine/Component/Sprite.ts" />

// Module
module game1 {
    var EnemyShipSpriteKey: string = "EnemyShip";
    var EnemyShipSpriteData: Engine.Component.ISpriteData = {
        sx: 37,
        sy: 0,
        w: 42,
        h: 43,
        frame: 1
    };
    // Class
    export class EnemyShip extends Engine.Component.Sprite {
        private reloadSpeed = 5;
        private xParams = { A: 0, B: 1, C: 1, D: 0 };
        private yParams = { A: 0, B: 1, C: 5, D: 0 };        
        private vx = 0;
        private vy = 0;       
        private t = 0;
        
        // Constructor
        constructor(public x: number, public y: number) {
            super(EnemyShipSpriteKey, x, y, EnemyShipSpriteData.w, EnemyShipSpriteData.h, 0, 0, 1);
            this.spriteKey = EnemyShipSpriteKey;
            
        }

        update() {
            var mx = this.xParams;
            var my = this.yParams;
            var dt = this.t / 100.00; //slow time down
            this.vx = mx.A + mx.B * Math.sin(mx.C * dt + mx.D);
            this.vy = my.A + my.B * Math.sin(my.C * dt + my.D);
            this.x += this.vx;
            this.y += this.vy;

            if (this.y > this.game.height || this.x < -this.width || this.x > this.game.width) {
                //remove myself because I've gone off screen
                this.container.removeComponent(this);
            }

            this.t++; //increment time
        }
         
        render(): void { //frame: number
            var frame: number = 0;
            this.spriteSet.render(this.game.context, this.spriteKey, this.x, this.y, frame);
        }

        get EnemyShipSpriteKey(): string {
            return EnemyShipSpriteKey;
        }
        get EnemyShipSpriteData(): Engine.Component.ISpriteData {
            return EnemyShipSpriteData;
        }
    }

}