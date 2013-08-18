/// <reference path="Component.ts" />
// Module
module Engine.Component {
    
    // Class
    export class Container extends ComponentObject {
        constructor(public components: ComponentObject[]) {
            super(); //init base
        }

        update(): void {
            this.updateComponents();
        }
        render(): void {
            this.renderComponents();
        }
        private updateComponents(): void {
            for (var i = 0; i < this.components.length; i++) {
                var component: ComponentObject = this.components[i];
                component.update();
            }
        }
        private renderComponents(): void{
            for (var i = 0; i < this.components.length; i++){
                var component: ComponentObject = this.components[i];
                component.render();
            }
        }
        addComponent(component: ComponentObject): void{
            if (component.parent !== this) {
                var index = this.components.indexOf(component);
                if (index < 0) {
                    this.components.push(component);
                    component.parent = this;
                }
            }
        }
        removeComponent(component: ComponentObject): void {
            var index = this.components.indexOf(component);
            if (index > -1) {
                this.components.splice(index, 1);
                component.parent = null;
            }
        }
    }

}