function InitGame() {
    // start downloading all the art using a preloader progress screen
    jaws.assets.root = "game-media/";
    jaws.assets.add(["penguin1_1.png"]);

    jaws.start(Game.BasicPlayState);
}

jaws.onload = InitGame;