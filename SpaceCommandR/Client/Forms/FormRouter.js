var Game = Game || {};
Game.FormRouter = (function (Game) {
    /*
    add forms
    setForm() -> transition to form
    */
    function FormRouter(options) {
        this.views = {};
    }

    FormRouter.prototype.addView = function (name, view) {
        this.views[name] = view;
        view.hide();
    };

    FormRouter.prototype.setView = function (name) {
        for(var view in this.views){
            this.views[view].container.slideUp();
        }
        if (name) {
            this.views[name].container.slideDown();
        }
    }

    FormRouter.prototype.setViewSizePosition = function (width, height, x, y) {
        for (var view in this.views) {
            this.views[view].setSizePosition(width, height, x, y);
        }
    };

    return FormRouter;
}(Game));