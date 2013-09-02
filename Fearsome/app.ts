/// <reference path="App/Board/Board.ts" />

window.onload = () => {
    var el = document.getElementById('content')
        , log = document.getElementById('log');
    
    var b: board = new board(el, log);
};