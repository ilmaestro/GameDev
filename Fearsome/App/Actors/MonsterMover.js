/// <reference path="../Utils.ts" />
/// <reference path="../Board/Board.ts" />
/// <reference path="../Constants.ts" />
/// <reference path="../Tiles/Tile.ts" />
/// <reference path="../../Scripts/d.ts/underscore/underscore.d.ts" />
var MonsterMover = (function () {
    function MonsterMover(initialDirection) {
        this.moveDeck = new MoveDeck();
        this.moveCounter = 0;
        this.killCounter = 0;
        this.moveDirection = initialDirection || Constants.Direction.Right;
        this.moveDeck.shuffle();
    }
    MonsterMover.prototype.nextCard = function () {
        var deckSize = this.moveDeck.getSize();
        if (deckSize == 0) {
            this.moveDeck.shuffle();
            this.board.log("deck re-shuffled!");
        }
        this.moveCard = this.moveDeck.getCard();
        this.board.log("drew card: " + this.moveCard.name);
        this.moveCounter = this.moveCard.numberOfMoves;
        this.killCounter = this.moveCard.numberOfKills;
    };

    MonsterMover.prototype.eatPlayer = function () {
        this.killCounter--;
    };

    MonsterMover.prototype.moveMonster = function (monster) {
        var retVal = false;

        if (this.isMoving() && this.isHungry()) {
            monster.move(this.moveDirection);
            this.moveCounter--;
            monster.update();
            retVal = true;
        }

        return retVal;
    };

    MonsterMover.prototype.isMoving = function () {
        return this.moveCounter > 0;
    };

    MonsterMover.prototype.isHungry = function () {
        return this.killCounter > 0;
    };

    MonsterMover.prototype.changeDirection = function (direction) {
        this.moveDirection = direction;
    };
    return MonsterMover;
})();

var MoveCard = (function () {
    function MoveCard(name, numberOfMoves, numberOfKills) {
        this.name = name;
        this.numberOfMoves = numberOfMoves;
        this.numberOfKills = numberOfKills;
    }
    return MoveCard;
})();

var MoveDeck = (function () {
    function MoveDeck() {
        this.createMoveTypes();
    }
    /*
    move types:
    - 5, 5 spaces, stop on kill count: infinite
    - 8, 8 spaces, stop on kill count: infinite
    - 10, 10 spaces, stop on kill count: infinite
    - I, 20 spaces, stop on kill count: 1
    - II, 20 spaces, stop on kill count: 2
    */
    MoveDeck.prototype.createMoveTypes = function () {
        this.moveCards = [];
        this.moveCards.push(new MoveCard("5", 5, 99));
        this.moveCards.push(new MoveCard("8", 8, 99));
        this.moveCards.push(new MoveCard("10", 10, 99));
        this.moveCards.push(new MoveCard("I", 20, 1));
        this.moveCards.push(new MoveCard("II", 20, 2));
    };

    MoveDeck.prototype.shuffle = function () {
        this.moveDeck = [];
        while (this.moveDeck.length < this.moveCards.length) {
            var index = Utils.GetRandomNumber(0, this.moveCards.length - 1, false), card = this.moveCards[index];

            if (!_.contains(this.moveDeck, card)) {
                this.moveDeck.push(card);
            }
        }
    };

    MoveDeck.prototype.getCard = function () {
        return this.moveDeck.pop();
    };

    MoveDeck.prototype.getSize = function () {
        return this.moveDeck.length;
    };
    return MoveDeck;
})();
//# sourceMappingURL=MonsterMover.js.map
