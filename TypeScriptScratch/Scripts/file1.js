/// <reference path="typeings/jquery.d.ts" />
/// <reference path="typeings/jaws.d.ts" />
var myFirstClass = (function () {
    function myFirstClass(param1) {
        this.myNum = parseFloat(param1);
    }
    return myFirstClass;
})();

window.onload = function () {
    var cl = new myFirstClass('100.024020');
    console.log(cl.myNum);
};
