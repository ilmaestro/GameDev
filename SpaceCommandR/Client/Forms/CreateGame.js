var Game = Game || {};
Game.CreateGameViewModel = (function (Game) {
    function CreateGameViewModel(options) {
        this.container = $(options.container);
        this.gameName = $(options.gameName);
        this.createBtn = $(options.createBtn);
        this.cancelBtn = $(options.cancelBtn);

        var self = this;
        this.createBtn.click(function (e) {
            e.preventDefault();
            options.onCreate(self.gameName.val());
        });
        this.cancelBtn.click(function (e) {
            e.preventDefault();
            options.onCancel();
        });

        this.setSizePosition(options.width || 400, options.height || 400, options.x || 50, options.y || 50);
    }

    /** Common Functions **/
    CreateGameViewModel.prototype.setSizePosition = function (width, height, x, y) {
        this.container.css({
            top: x,
            left: y,
            width: width,
            height: height
        });
    };

    CreateGameViewModel.prototype.show = function () {
        this.container.show();
    };

    CreateGameViewModel.prototype.hide = function () {
        this.container.hide();
    };

    return CreateGameViewModel;
}(Game));