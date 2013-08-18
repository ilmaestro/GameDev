/// <reference path="../Engine/Component/SpriteSet.ts" />

// Module
module game1 {

    export var enemyShipMap: { [index: string]: Engine.Component.ISpriteData; } = {};
    enemyShipMap["ship1"] = {
        sx: 37,
        sy: 0,
        w: 42,
        h: 43,
        frame: 1
    };
    enemyShipMap["ship2"] = {
        sx: 79,
        sy: 0,
        w: 37,
        h: 43,
        frame: 1
    };
    
    export var level1 = [
        [0, 4000, 500, 'ship1'],
        [6000, 13000, 800, 'ship2']
    ];

}
