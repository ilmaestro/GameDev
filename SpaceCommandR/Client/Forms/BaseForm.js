var Game = Game || {};
Game.BaseForm = (function (Game) {
    function BaseForm(options) {
        this.container = $(options.container);
        //this.userNameInput = $(options.userNameInput);
        //this.userColorInput = $(options.userColorInput);
        this.updateBtn = $(options.updateBtn);
        this.cancelBtn = $(options.cancelBtn);

        var self = this;
        this.updateBtn.click(function () {
            options.onUpdate();
        });
        this.cancelBtn.click(function () {
            options.onCancel();
        });

        this.setSizePosition(options.width || 400, options.height || 400, options.x || 50, options.y || 50);
    }

    BaseForm.prototype.setSizePosition = function (width, height, x, y) {
        this.container.css({
            top: x,
            left: y,
            width: width,
            height: height
        });
    };
    
    //BaseForm.prototype.userName = function () {
    //    return this.userNameInput.val();
    //};
    //BaseForm.prototype.userColor = function () {
    //    return this.userColorInput.val();
    //};

    BaseForm.prototype.show = function () {
        this.container.show();
    };

    BaseForm.prototype.hide = function () {
        this.container.hide();
    };

    return BaseForm;
}(Game));