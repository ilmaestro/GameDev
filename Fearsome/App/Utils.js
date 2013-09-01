/// <reference path="Interfaces/ISize.ts" />
var Utils;
(function (Utils) {
    function GetViewportSize() {
        var size = { width: 0, height: 0 };

        if (window.innerWidth) {
            size.height = window.innerHeight;
            size.width = window.innerWidth;
        } else if (document.documentElement) {
            size.height = document.documentElement.clientHeight;
            size.width = document.documentElement.clientWidth;
        } else if (document.body) {
            size.height = document.body.clientHeight;
            size.width = document.body.clientWidth;
        } else {
            size.height = undefined;
            size.width = undefined;
        }

        return size;
    }
    Utils.GetViewportSize = GetViewportSize;

    function AddEvent(target, eventType, handler) {
        if (target.addEventListener) {
            target.addEventListener(eventType, handler, false);
        } else if (target.attachEvent) {
            target.attachEvent("on" + eventType, handler);
        }
    }
    Utils.AddEvent = AddEvent;

    function GetRandomNumber(low, high, flt) {
        var retVal = Math.random() * (high - (low - 1)) + low;

        if (!flt) {
            retVal = Math.floor(retVal);
        }
        return retVal;
    }
    Utils.GetRandomNumber = GetRandomNumber;

    function GetAtoZ() {
        var startingChar = 97, i = 0, AZList = [];

        for (; i < 26; i++) {
            AZList.push(String.fromCharCode(startingChar + i));
        }

        return AZList;
    }
    Utils.GetAtoZ = GetAtoZ;
})(Utils || (Utils = {}));
//# sourceMappingURL=Utils.js.map
