/// <reference path="../Engine/Component/SpriteSet.ts" />
// Module
var game1;
(function (game1) {
    game1.enemyShipMap = {};
    game1.enemyShipMap["ship1"] = {
        sx: 37,
        sy: 0,
        w: 42,
        h: 43,
        frame: 1
    };
    game1.enemyShipMap["ship2"] = {
        sx: 79,
        sy: 0,
        w: 37,
        h: 43,
        frame: 1
    };

    game1.level1 = [
        [0, 4000, 500, 'ship1'],
        [6000, 13000, 800, 'ship2']
    ];
})(game1 || (game1 = {}));
