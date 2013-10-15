<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="SpaceCommandR._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="IE=edge" />
    <title>Space Commander</title>

    <!-- iOS settings -->
    <meta name="apple-mobile-web-app-title" content="Space Commander" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
 	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="apple-touch-icon" href="/images/icon.png" />
    <link rel="apple-touch-startup-image" href="/images/startup.jpg" />
	<meta name="viewport" content="width=device-width, initial-scale=0.8, user-scalable=no" />
 
    <!-- WinJS references -->
    <!-- <link href="//Microsoft.WinJS.1.0/css/ui-dark.css" rel="stylesheet" /> -->
    <!-- <script src="//Microsoft.WinJS.1.0/js/base.js"></script>
    <script src="//Microsoft.WinJS.1.0/js/ui.js"></script> -->

    <!-- framework references -->
    <script src="/Scripts/jquery-2.0.3.min.js" ></script>
    <script src="/Scripts/jquery.signalR-1.1.3.js"></script>
    <script src="/Scripts/toastr.js" type="text/javascript"></script>
    <script src="/Scripts/jaws.js" type="text/javascript"></script>
    <script src="/Scripts/howler.js" type="text/javascript"></script>
    <script src="/Scripts/bootstrap.min.js"></script>
    <script src="/signalr/hubs"></script>    <!-- game-specific references -->
    <link href="/Content/toastr.css" rel="stylesheet" />
    <link href="/Content/bootstrap.min.css" rel="stylesheet" />
    <link href="/Content/game.css" rel="stylesheet" />

    <!-- <script src="game-media/level1.js" type="text/javascript"></script> -->

    <!-- game starts here! -->
    <script src="/Client/globals.js" type="text/javascript"></script>  
    <script src="/Client/Util/vector.js" type="text/javascript"></script>  
    <script src="/Client/Util/log.js" type="text/javascript"></script>
    <script src="/Client/Util/helper.js" type="text/javascript"></script>
    <script src="/Client/Space/grid.js" type="text/javascript"></script>
    <script src="/Client/Space/background.js" type="text/javascript"></script>
    <script src="/Client/Player/player.js" type="text/javascript"></script>
    <script src="/Client/Station/station.js" type="text/javascript"></script>
    <script src="/Client/Space/planetoid.js" type="text/javascript"></script>
    <script src="/Client/Projectile/projectile.js" type="text/javascript"></script>
    <script src="/Client/Projectile/projectileManager.js" type="text/javascript"></script>
    <script src="/Client/Anim/explosion.js" type="text/javascript"></script>
    <script src="/Client/Game/title.js" type="text/javascript"></script>  
    <script src="/Client/Game/lobby.js" type="text/javascript"></script>  
    <script src="/Client/Game/multiplayer.js" type="text/javascript"></script>  
    <script src="/Client/Game/world.js" type="text/javascript"></script>

    <!-- Form View Models -->
    <script src="/Client/forms/UpdateProfile.js" type="text/javascript"></script>  
    <script src="/Client/forms/CreateGame.js" type="text/javascript"></script>  
    <script src="/Client/forms/JoinGame.js" type="text/javascript"></script>  
    <script src="/Client/forms/LaunchGame.js" type="text/javascript"></script>  
    <script src="/Client/forms/FormRouter.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
    <!-- fps and debug information goes here -->
    <span id='info'></span>
    <span id='fps'></span>
    <%--<input type="text" id="username" value="Player 1" placeholder="Enter Name" />
    <input type="text" id="usercolor" value="green" placeholder="Enter Color" />--%>
    <input type="button" id="btn" value="Start Game" />


    <!-- Update Profile Form -->
    <div id="UpdateProfile" class="GamePanel form-horizontal">
        <div class="panel-header">
            <h2>Profile</h2>
        </div>

        <div class="control-group">
            <label class="control-label" for="profileUserName">User Name</label>
            <div class="controls">
                <input type="text" id="profileUserName" class="input-block-level" placeholder="User Name" />
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="profileUserColor">Color</label>
            <div class="controls">
                <input type="color" id="profileUserColor" class="input-color" />
            </div>
        </div>
        <div class="control-group">
            <label class="control-label"></label>
            <div class="controls">
                <button id="profileUpdateBtn" class="btn btn-large btn-primary">Update</button>
                <button id="profileCancelBtn" class="btn btn-large btn-danger">Cancel</button>
            </div>
        </div>
    </div>

    <!-- Create Game Form -->
    <div id="CreateGame" class="GamePanel form-horizontal">
        <div class="panel-header">
            <h2>Create Game</h2>
        </div>

        <input type="text" id="createGameName" class="input-block-level" placeholder="Game Name" />

        <div class="control-group">
            <label class="control-label"></label>
            <div class="controls">
                <button id="createGameBtn" class="btn btn-large btn-primary">Create</button>
                <button id="createGameCancelBtn" class="btn btn-large btn-danger">Cancel</button>
            </div>
        </div>
    </div>

    <!-- Join Game Form -->
    <div id="JoinGame" class="GamePanel form-horizontal">
        <div class="panel-header">
            <h2>Join Game</h2>
        </div>

        <table id="gameTable" class="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Game</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

        <div class="control-group">
            <label class="control-label"></label>
            <div class="controls">
                <button id="joinGameCancelBtn" class="btn btn-large btn-danger">Cancel</button>
            </div>
        </div>
    </div>

    <!--Game Launch Form -->
    <div id="LaunchGame" class="GamePanel form-horizontal">
        <div class="panel-header">
            <h2>Launch Game - <span id="launchGameName"></span></h2>
        </div>

        <table id="playerTable" class="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Color</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

        <div class="control-group">
            <label class="control-label"></label>
            <div class="controls">
                <button id="readyGameBtn" class="btn btn-large btn-primary">Ready</button>
                <button id="readyGameCancelBtn" class="btn btn-large btn-danger">Cancel</button>
            </div>
        </div>
    </div>
    
    <script type="text/javascript">

        $(function () {
            var game = new Game.World();
            //hide views
            $("#UpdateProfile").hide();
            $("#CreateGame").hide();
            $("#JoinGame").hide();
            $("#LaunchGame").hide();

            var sound = new Howl({
                urls: ['/Content/hit.mp3']
            });

            $("#btn").click(function () {
                sound.stop();
                sound.play();
                //var username = $("#username").val();
                //var usercolor = $("#usercolor").val();
                $("#btn").remove();
                //$("#username").remove();
                //$("#usercolor").remove();
                //game.initPlayer(username, usercolor);
                game.init(function () {
                    jaws.start(game.currentState);
                    //jaws.start(game.multiplayer);
                });
            });
        });
    </script>
    </form>
</body>
</html>
