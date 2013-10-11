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
    <script src="/signalr/hubs"></script>    <!-- game-specific references -->
    <link href="/Content/game.css" rel="stylesheet" />
    <link href="/Content/toastr.css" rel="stylesheet" />

    <!-- <script src="game-media/level1.js" type="text/javascript"></script> -->

    <!-- game starts here! -->
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
    <script src="/Client/Game/multiplayer.js" type="text/javascript"></script>  
    <script src="/Client/Game/world.js" type="text/javascript"></script>  
</head>
<body>
    <form id="form1" runat="server">
    <!-- fps and debug information goes here -->
    <span id='info'></span>
    <span id='fps'></span>
    <input type="text" id="username" value="" placeholder="Enter Name" />
    <input type="text" id="usercolor" value="" placeholder="Enter Color" />
    <input type="button" id="btn" value="Start Game" />

    <script type="text/javascript">

        $(function () {
            $("#btn").hide();
            toastr.info("loaded..");
            var game = new Game.World();
            
            $("#btn").show();

            var sound = new Howl({
                urls: ['/Content/hit.mp3']
            });

            $("#btn").click(function () {
                sound.stop();
                sound.play();
                var username = $("#username").val();
                var usercolor = $("#usercolor").val();
                $("#btn").remove();
                $("#username").remove();
                $("#usercolor").remove();
                game.join(username, usercolor);

                game.init(function () {
                    jaws.start(game.state);
                    game.chatHub.server.send(username, "hello world!");
                });
            });
        });
    </script>
    </form>
</body>
</html>
