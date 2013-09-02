/// <reference path="../Utils.ts" />
/// <reference path="../Board/Board.ts" />
/// <reference path="../Constants.ts" />
/// <reference path="../Tiles/Tile.ts" />
/// <reference path="../../Scripts/d.ts/underscore/underscore.d.ts" />


class MonsterMover {
    private moveCard: MoveCard;
    private moveDeck: MoveDeck;
    private moveCounter: number;    
    private killCounter: number;    
    board: board;

    moveDirection: Constants.Direction;

    constructor(initialDirection?: Constants.Direction) {
        this.moveDeck = new MoveDeck();
        this.moveCounter = 0;
        this.killCounter = 0;
        this.moveDirection = initialDirection || Constants.Direction.Right;
        this.moveDeck.shuffle();
    }

    nextCard() {
        var deckSize = this.moveDeck.getSize();
        if (deckSize == 0) {
            this.moveDeck.shuffle();
            this.board.log("deck re-shuffled!");
        }
        this.moveCard = this.moveDeck.getCard();
        this.board.log("drew card: " + this.moveCard.name);
        this.moveCounter = this.moveCard.numberOfMoves;
        this.killCounter = this.moveCard.numberOfKills;
    }

    eatPlayer(): void {
        this.killCounter--;
    }

    moveMonster(monster: Monster): boolean {
        var retVal: boolean = false;
        
        if (this.isMoving() && this.isHungry()) {
            monster.move(this.moveDirection);
            this.moveCounter--;
            monster.update();
            retVal = true;
        }

        return retVal;
    }

    isMoving(): boolean {
        return this.moveCounter > 0;
    }

    isHungry(): boolean {
        return this.killCounter > 0;
    }

    changeDirection(direction: Constants.Direction) {
        this.moveDirection = direction;
    }
}


class MoveCard implements IMoveType {
    constructor(public name: string, public numberOfMoves: number, public numberOfKills: number) {
    }
}

class MoveDeck {
    private moveCards: MoveCard[];
    private moveDeck: MoveCard[];

    constructor() {
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
    private createMoveTypes() {
        this.moveCards = [];
        this.moveCards.push(new MoveCard("5", 5, 99));
        this.moveCards.push(new MoveCard("8", 8, 99));
        this.moveCards.push(new MoveCard("10", 10, 99));
        this.moveCards.push(new MoveCard("I", 20, 1));
        this.moveCards.push(new MoveCard("II", 20, 2));
    }

    shuffle() {
        this.moveDeck = [];
        while (this.moveDeck.length < this.moveCards.length) {
            var index = Utils.GetRandomNumber(0, this.moveCards.length-1, false)
                , card = this.moveCards[index];

            if (!_.contains(this.moveDeck, card)) {
                this.moveDeck.push(card);
            }
        }
    }

    getCard(): MoveCard {
        return this.moveDeck.pop();
    }

    getSize(): number {
        return this.moveDeck.length;
    }
}

