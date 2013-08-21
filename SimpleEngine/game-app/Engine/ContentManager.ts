/// <reference path="../jquery.d.ts" />
// Module
module Engine {

    // Class
    export class ContentManager {
        public root: string;

        // Constructor
        constructor() {
        }

        loadImage(imageSrc: string) {
            var def = $.Deferred();
            var image = new Image();
            
            image.onload = function (e) {
                def.resolve(this);
            }
            image.onerror = function (e) {
                def.reject(e);
            }

            image.src = this.root + imageSrc;

            return def;
        }
    }
}