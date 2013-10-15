var Game = Game || {};
Game.UpdateProfileViewModel = (function (Game) {
    function UpdateProfileViewModel(options) {
        var self = this;
        this.container = $(options.container);
        this.userNameInput = $(options.userNameInput);
        this.userColorInput = $(options.userColorInput);
        this.updateBtn = $(options.updateBtn);
        this.cancelBtn = $(options.cancelBtn);
        this.player = options.player;
        if (this.player) {
            this.userNameInput.val(this.player.name);
            this.userColorInput.val(this.player.color);
        }
        
        this.updateBtn.click(function (e) {
            e.preventDefault();
            options.onUpdate(self.userName(), self.userColor());
        });
        this.cancelBtn.click(function (e) {
            e.preventDefault();
            options.onCancel();
        });

        this.setSizePosition(options.width || 400, options.height || 400, options.x || 50, options.y || 50);
    }

    UpdateProfileViewModel.prototype.setSizePosition = function (width, height, x, y) {
        this.container.css({
            top: x,
            left: y,
            width: width,
            height: height
        });
    };
    
    UpdateProfileViewModel.prototype.userName = function () {
        return this.userNameInput.val();
    };
    UpdateProfileViewModel.prototype.userColor = function () {
        return this.userColorInput.val();
    };

    UpdateProfileViewModel.prototype.show = function () {
        this.container.show();
    };

    UpdateProfileViewModel.prototype.hide = function () {
        this.container.hide();
    };

    return UpdateProfileViewModel;
}(Game));