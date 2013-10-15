var Game = Game || {};
Game.Lobby = (function(Game){

	/*
	*
	* constructor
	*
	*/

	function Lobby (world, viewport){
	    this.world = world;

	    this.menuItems = ["New Game", "Join Game", "Profile", "Go Back"];
	    this.menuIndex = 0;

	    this.players = [];
	    this.currentPlayer;

	    this.router = new Game.FormRouter({});

		// sprites
		this.background;

		// game state
		this.isDragging = false;

		// constants
		this.viewportSpeed = 5;
		this.viewportMaxSpeed = 20;

	    //views
		var self = this;
		

	    // set profile screen if the current player doesn't already exist
		//if (!this.world.userName) {
		//    this.router.setView("UpdateProfile");
		//}
	}

	/*
	*
	* events
	*
	*/

	Lobby.prototype.onResize = function(){
	    if (this.world.viewport) {
	        this.world.viewport.width = jaws.canvas.width;
	        this.world.viewport.height = jaws.canvas.height;
	        this.router.setViewSizePosition(jaws.canvas.width - 200, jaws.canvas.height - 200, 50, 50);
	    }
	};

	Lobby.prototype.onMouseMove = function(){
	    var self = this;
        //detect drag
		if (jaws.pressed("left_mouse_button") && !this.isDragging) {
			this.touch.x = this.world.viewport.x + jaws.mouse_x;
			this.touch.y = this.world.viewport.y + jaws.mouse_y;
		}

		if(!jaws.pressed("left_mouse_button")) {
			this.isDragging = false;
		}

		if(this.isDragging){
			this.touch.x = this.world.viewport.x + jaws.mouse_x;
			this.touch.y = this.world.viewport.y + jaws.mouse_y;
		}
	};


	Lobby.prototype.onMouseUp = function () {

	};
    
	Lobby.prototype.onNewPlayer = function (player) {
	    this.players.push(player);
	    this.router.views.launchGameView.addPlayers.apply(this.router.views.launchGameView, [this.players]);
	};

	Lobby.prototype.onUpdatePlayers = function (playerList) {
	    var self = this;
	    this.players = [];

	    playerList.forEach(function (player) {
	        var p = new Game.Player(player);
	        self.players.push(p);
	        if (player.name == self.world.userName) {
	            self.currentPlayer = p;
	        }
	    });
	    self.router.views.launchGameView.addPlayers.apply(self.router.views.launchGameView, [self.players]);
	};

	Lobby.prototype.onUpdateGames = function (gameList) {
	    this.router.views.joinGameView.addGames.apply(this.router.views.joinGameView, [gameList]);
	};
	/*
	*
	* setup sequence
	*
	*/

	Lobby.prototype.setup = function(){
		jaws.clear();
		var self = this;
		this.menuItems = ["New Game", "Join Game", "Profile", "Go Back"];
		this.menuIndex = 0;
		// set up the chase camera view
        //this.viewport = new jaws.Viewport({ max_x: 1000, max_y: 1000 });
		this.world.viewport = new jaws.Viewport({ max_x: this.world.viewport_max_x, max_y: this.world.viewport_max_y });
		jaws.activeviewport = this.world.viewport; // resize events need this in global scope
		
		//setup parallax background
		this.background = new Game.Background({});

	    //views
		this.router.views = {};

	    //current player
		this.currentPlayer = new Game.Player({
		    name: self.world.userName,
		    color: self.world.userColor,
		    isAlive: true
		});
        
		this.router.addView("updateProfileView", new Game.UpdateProfileViewModel({
            player: this.currentPlayer,
		    container: ("#UpdateProfile"),
		    userNameInput: ("#profileUserName"),
		    userColorInput: ("#profileUserColor"),
		    updateBtn: ("#profileUpdateBtn"),
		    cancelBtn: ("#profileCancelBtn"),
		    onUpdate: function (name, color) {
		        self.currentPlayer.name = name;
		        self.currentPlayer.color = color;
		        self.world.userName = name;
		        self.world.userColor = color;
		        localStorage.setItem(Game.Globals.PlayerNameKey, self.currentPlayer.name);
		        localStorage.setItem(Game.Globals.PlayerColorKey, self.currentPlayer.color);
		        self.router.setView(null);
		    },
		    onCancel: function () {
		        self.router.setView(null);
		    }
		}));

		this.router.addView("createGameView", new Game.CreateGameViewModel({
		    container: ("#CreateGame"),
		    gameName: ("#createGameName"),
		    createBtn: ("#createGameBtn"),
		    cancelBtn: ("#createGameCancelBtn"),
		    onCreate: function (gameName) {
		        self.world.commandHub.server.joinGroup(gameName, self.currentPlayer);
		        self.router.views.launchGameView.setGame.apply(self.router.views.launchGameView, [gameName]);
		        self.router.setView("launchGameView");
		    },
		    onCancel: function () {
		        self.router.setView(null);
		    }
		}));

		this.router.addView("joinGameView", new Game.JoinGameViewModel({
		    container: ("#JoinGame"),
		    gameTable: ("#gameTable"),
		    cancelBtn: ("#joinGameCancelBtn"),
		    onJoin: function (gameName) {
		        toastr.info("Joined " + gameName);
		        self.world.commandHub.server.joinGroup(gameName, self.currentPlayer);
		        self.router.views.launchGameView.setGame.apply(self.router.views.launchGameView, [gameName]);
		        self.router.setView("launchGameView");
		    },
		    onCancel: function () {
		        self.router.setView(null);
		    }
		}));

		this.router.addView("launchGameView", new Game.LaunchGameViewModel({
		    container: ("#LaunchGame"),
		    playerTable: ("#playerTable"),
		    gameNameSpan: ("#launchGameName"),
		    readyBtn: ("#readyGameBtn"),
		    cancelBtn: ("#readyGameCancelBtn"),
		    onReady: function (gameName) {
		        self.world.gameName = gameName;
		        self.world.commandHub.server.readyPlayer(gameName, self.currentPlayer);
		        self.menuItems = ["Waiting for other players.."];
		        self.menuIndex = 0;
		        self.router.setView(null);
		    },
		    onCancel: function () {
		        self.world.commandHub.server.leaveGroup(self.router.views.launchGameView.game.name, self.currentPlayer);
		        self.router.setView(null);
		    }
		}));

		this.router.setViewSizePosition(jaws.canvas.width - 100, jaws.canvas.height - 100, 50, 50);

        jaws.preventDefaultKeys(["up", "down", "left", "right", "space"]);
        jaws.on_keydown(["down"], function () { self.menuIndex++; if (self.menuIndex >= self.menuItems.length) { self.menuIndex = self.menuItems.length - 1; } });
        jaws.on_keydown(["up"], function () { self.menuIndex--; if (self.menuIndex < 0) { self.menuIndex = 0; } });
        jaws.on_keydown(["esc"], function () { self.router.setView(null);});
        jaws.on_keydown(["enter", "space"], function () {
            if (self.menuItems[self.menuIndex] == "New Game") {
                self.router.setView("createGameView");
            } else if (self.menuItems[self.menuIndex] == "Join Game") {
                self.router.setView("joinGameView");
            } else if (self.menuItems[self.menuIndex] == "Profile") {
                self.router.setView("updateProfileView");
            } else {
                self.router.setView(null);
                self.world.currentState = self.world.titlescreen;
                jaws.switchGameState(self.world.currentState);
            }
        });
	};

	/*
	*
	* update sequence
	* 
	*/

	Lobby.prototype.update = function(){
		this.background.parallax.camera_x += 3;
	};

	/*
	*
	* draw sequence
	*
	*/

	Lobby.prototype.draw = function(){
		var self = this, i = 0;
		jaws.clear();
		this.background.draw();
		this.world.viewport.apply(function(){
		    self.drawGameTitle();
		    self.drawGameMenu();
		    //self.drawPlayers();
		});
	};


	Lobby.prototype.drawGameTitle = function(){
	    var ctx = jaws.context,
	        titleText = "Space Commander";

	    ctx.beginPath();
	    ctx.font = "80px Georgia";
	    ctx.fillStyle = "green";
	    ctx.shadowBlur = 20;
        ctx.shadowColor = "green"
        var textWidth = ctx.measureText(titleText).width;
        ctx.fillText(titleText, this.world.viewport.width / 2 - textWidth / 2, this.world.viewport.height / 2 - 100);
	};

	Lobby.prototype.drawGameMenu = function () {
	    var ctx = jaws.context, i = 0, color = "green", selected = "yellow";

	    ctx.beginPath();
	    ctx.font = "40px Georgia";
	    ctx.shadowBlur = 10;
	    for (i = 0; i < this.menuItems.length; i++) {
	        var textWidth = ctx.measureText(this.menuItems[i]).width;
	        ctx.fillStyle = this.menuIndex == i ? selected : color;
	        ctx.shadowColor = this.menuIndex == i ? selected : color;

	        ctx.fillText(this.menuItems[i], this.world.viewport.width / 2 - textWidth / 2, this.world.viewport.height / 2 + i * 50);

	    }
	};

	Lobby.prototype.drawPlayers = function () {
	    var ctx = jaws.context, i = 0, color = "yellow", selected = "red";

	    ctx.beginPath();
	    ctx.font = "20px Georgia";
	    ctx.shadowBlur = 10;
	    ctx.fillStyle = "blue";
	    ctx.shadowColor = "blue";
	    ctx.fillText("Players:", 0, 50);

	    for (i = 0; i < this.players.length; i++) {
	        var textWidth = ctx.measureText(this.players[i]).width;
	        ctx.fillStyle = this.players[i].name == this.world.userName ? selected : color;
	        ctx.shadowColor = this.players[i].name == this.world.userName ? selected : color;

	        ctx.fillText(this.players[i].name, 0, 100 + i * 20);

	    }
	};

	Lobby.prototype.setupViews = function () {
	    
	};

	return Lobby;
}(Game));