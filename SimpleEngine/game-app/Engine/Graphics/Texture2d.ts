// Interface
interface ITexture2d {
    name: string;
    image: HTMLImageElement;
}
// Module
module Engine.Graphics {

    // Class
    export class Texture2d implements ITexture2d {
        // Constructor
        constructor(public name: string, public image: HTMLImageElement) {
        }
    }

}
