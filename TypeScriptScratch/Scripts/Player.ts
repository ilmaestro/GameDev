module Game {
    export interface Vector {
        x: number;
        y: number;
    }
    
    export module Classes {
        export var PlayerType = {
                Hero: 1,
                Enemy: 2
            }

        export class Player {
                constructor(public position: Vector = { x: 0, y: 0 }, public playerType: number = PlayerType.Enemy) {
                }

                draw(): void {

                }
            }
    }
}