var Game = Game || {};
Game.World = (function(Game){
    function World() {
        var self = this;

	    this.debugmode = true;
        this.fps = document.getElementById("fps");

        // viewport
        this.viewport; // the visible game world that scrolls around with player in the center
        this.viewport_max_x = 2000; // these defaults are overwritten...
        this.viewport_max_y = 2000; // ...depending on map data

        //game state
        this.titlescreen = new Game.Title(this, this.viewport);
        this.lobby = new Game.Lobby(this, this.viewport);
        this.multiplayer = new Game.Multiplayer(this, this.viewport);
        this.currentState = this.titlescreen;

        this.userName = localStorage.getItem(Game.Globals.PlayerNameKey);
        this.userColor = localStorage.getItem(Game.Globals.PlayerColorKey);
        this.gameName = "";

        // SignalR
        this.connection = $.connection;
        this.chatHub = this.connection.chatHub;
        this.commandHub = this.connection.commandHub;

        // constants
        this.BOUNCE = 0.6;
        this.FRICTION = 0.1;

        //sounds
        this.mute = false;
        this.soundMusic = null;
        this.soundAttack = null;
        this.soundHit = null;
	}

    World.prototype.initPlayer = function (username, usercolor) {
        this.userName = username;
        this.userColor = usercolor;
        //this.commandHub.server.joinGame(username, usercolor);
    };

    World.prototype.update = function(){
        this.fps.innerHTML = "FPS: " + jaws.game_loop.fps;

        if (jaws.pressed("esc")) {
            this.currentState = this.titlescreen;
            jaws.switchGameState(this.currentState);
        }

        if(jaws.pressed("up")){
        }
        if(jaws.pressed("right")){
        }
        if(jaws.pressed("down")){
        }
    };

	World.prototype.init = function(onStartCallback){
		// Create a canvas
	    this.canvas = document.createElement("canvas");
	    // liquid layout: stretch to fill
	    this.canvas.width = window.innerWidth;
	    this.canvas.height = window.innerHeight;
	    // the id the game engine looks for
	    this.canvas.id = 'canvas';
	    // add the canvas element to the html document
	    document.body.appendChild(this.canvas);

		// optionally ensure all gfx data is current by re-downloading everything (no cache)
        if (this.debugmode) jaws.assets.bust_cache = true;

        // start downloading all the art using a preloader progress screen
        jaws.assets.root = "/Content/";
        jaws.assets.add(["starfield_1.png", "starfield_2.png","starfield_3.png","starfield_4.png","starfield_5.png","explosion_2.png"]); //"gui.png", "font.png", "parallax.png", "player.png", "particles.png", "tiles.png", "msgbox.png", "enemies.png"]);


        //viewport_max_x = leveldata.width * leveldata.tilewidth;
        //viewport_max_y = (leveldata.height + 2) * leveldata.tileheight; // extend past the level data: fell_too_far + 1;
        this.soundInit();
        this.attachEvents();

        // once the art has been loaded we will create an instance of this class        
        onStartCallback();
	};


	/**
    * this function is used to detect when the screen size has changed
    * due to rotation of a tablet or going into "snapped" view
    * it resizes the game canvas and pauses the game
    */
    World.prototype.onResize = function (e) {
        Game.Log('window size is now ' + window.innerWidth + 'x' + window.innerHeight);

        // for example, on a 1366x768 tablet, swiped to the side it is 320x768
        jaws.canvas.width = window.innerWidth;
        jaws.canvas.height = window.innerHeight;
        jaws.width = jaws.canvas.width;
        jaws.height = jaws.canvas.height;
        

        // move the gui elements around
        //liquidLayoutGUI();
        //this.resizeHandler();

        // wait for the user to be ready to play
        //pauseGame(true);
    };

    World.prototype.setupHubs = function (callback) {
        var self = this;
        // add push events


        //setup chat events
        this.chatHub.client.broadcastMessage = function (name, message) {
            toastr.info(name + ': ' + message);
        };

        this.commandHub.client.broadcastMessage = function (name, message) {
            toastr.info(name + ': ' + message);

        }

        //setup lobby events
        this.commandHub.client.updatePlayers = function (playerList) {
            self.lobby.onUpdatePlayers(playerList);
            toastr.info("Updated from server.");
        };

        this.commandHub.client.addPlayer = function (player) {
            self.lobby.onNewPlayer(new Game.Player(player));
        };

        this.commandHub.client.updateGames = function (gameList) {
            self.lobby.onUpdateGames(gameList);
        };

        //setup multiplayer events
        this.commandHub.client.spawnProjectile = function (station, x, y, vx, vy) {
            self.multiplayer.onSpawnProjectile(station, x, y, vx, vy);
        };

        this.commandHub.client.startTurn = function (player) {
            self.multiplayer.onStartTurn(player);
        };

        this.commandHub.client.startRound = function (player) {
            toastr.info("Next round.");
            self.multiplayer.onStartTurn(player);
        };

        this.commandHub.client.beginGame = function (players) {
            self.beginMultiplayer();
            self.multiplayer.onUpdatePlayers(players);
        };

        this.commandHub.client.endGame = function (player) {
            toastr.info(player.name + " wins!");
            self.endMultiplayer();
        };
        
        //init connection
        this.connection.hub.start().done(function () {
            callback();
        });
    };

    World.prototype.enterLobby = function () {
        var self = this;

        this.setupHubs(function () {
            self.currentState = self.lobby;
            //self.commandHub.server.joinGame(self.userName, self.userColor);
            jaws.switchGameState(self.currentState);
        });
    };

    World.prototype.beginMultiplayer = function () {
        var self = this;
        self.currentState = self.multiplayer;
        jaws.switchGameState(self.currentState);
    };

    World.prototype.endMultiplayer = function () {
        var self = this;
        self.currentState = self.titlescreen;
        jaws.switchGameState(self.currentState);
    };

    World.prototype.attachEvents = function(){
        var self = this;
        // make sure the game is liquid layout resolution-independent (RESPONSIVE)
        window.addEventListener("resize", function(e){
            self.onResize(e);
            self.currentState.onResize(e);
        }, false);

        window.addEventListener("mousemove", function(e){
            event = (e) ? e : window.event;  
            self.currentState.onMouseMove(event);
            event.preventDefault();
        }, false);

        window.addEventListener("mouseup", function (e) {
            event = (e) ? e : window.event;
            self.currentState.onMouseUp(event);
            event.preventDefault();
        }, false);

        window.addEventListener("touchend", function (e) {
            event = (e) ? e : window.event;
            self.currentState.onMouseUp(event);
            event.preventDefault();
        }, false);

        window.addEventListener("touchmove", function(e){
            event = (e) ? e : window.event;  
            jaws.mouse_x = event.touches[0].pageX - jaws.canvas.offsetLeft;
            jaws.mouse_y = event.touches[0].pageY - jaws.canvas.offsetTop;
            self.currentState.onMouseMove(event);
            event.preventDefault();
        }, false);

        // dont't let any mouse/touch select things: this is a game
        document.addEventListener("selectstart", function (e) { e.preventDefault(); }, false);
        // dont't let touch-and-hold (or right click) create a context menu
        document.addEventListener("contextmenu", function (e) { e.preventDefault(); }, false);
        // don't show the hint visual for context menu either
        document.addEventListener("MSHoldVisual", function (e) { e.preventDefault(); }, false);
    };

    /**
    * Inits the sound engine by preloading the appropriate sound data
    * ogg and wav versions are only used for online webpage versions
    * in order to account for varying codec availability between browsers
    * in win8 store apps, only the mp3 is loaded
    */
    World.prototype.soundInit = function () {
        // start the ambient music immediately - while downloading sprites
        // this.soundMusic = new Howl(
        // {
        //     urls: ['/Content/music_nando.mp3'],
        //     // this should be true but it never loops if we stream
        //     buffer: false, // stream - start playing before all is downloaded: forces use of html5audio
        //     autoplay: true,
        //     loop: true,
        //     volume: 0.5 // quieter
        // });

        // load the other sound effects once images are done
        this.soundAttack = new Howl({ urls: ['/Content/attack.mp3', '/Content/attack.ogg', '/Content/attack.wav'], volume: 0.5 });
        this.soundHit = new Howl({ urls: [ '/Content/hit.ogg', '/Content/hit.wav'], volume: 1.0 });
        this.soundSwish = new Howl({ urls: ['/Content/swish.mp3', '/Content/swish.ogg', '/Content/swish.wav'], volume: 1.0 });
    };

    World.prototype.sfxattack = function () { if (!this.mute && this.soundAttack !== null) { this.soundAttack.stop(); this.soundAttack.play(); } };
    World.prototype.sfxhit = function () { if (!this.mute && this.soundHit !== null) { this.soundHit.stop(); this.soundHit.play(); } };
    World.prototype.sfxswish = function () { if (!this.mute && this.soundSwish !== null) { this.soundSwish.stop(); this.soundSwish.play(); } };


	return World;
}(Game));