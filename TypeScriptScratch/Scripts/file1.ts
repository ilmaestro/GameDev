/// <reference path="typeings/jquery.d.ts" />
/// <reference path="typeings/jaws.d.ts" />

class myFirstClass {

    myNum: number;
    myDate: Date;
    myString: string;
    
    constructor(param1: string) {
        this.myNum = parseFloat(param1);
    }
}

window.onload = function () {
    var cl = new myFirstClass('100.024020');
    console.log(cl.myNum);
};
