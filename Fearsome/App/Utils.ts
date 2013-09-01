/// <reference path="Interfaces/ISize.ts" />
module Utils {
    export function GetViewportSize(): ISize {
        var size: ISize = { width: 0, height: 0 };

        if (window.innerWidth) {
            size.height = window.innerHeight;
            size.width = window.innerWidth;
        }
        else if (document.documentElement) {
            size.height = document.documentElement.clientHeight;
            size.width = document.documentElement.clientWidth;
        }
        else if (document.body) {
            size.height = document.body.clientHeight;
            size.width = document.body.clientWidth;
        }
        else {
            size.height = undefined;
            size.width = undefined;
        }

        return size;
    }

    export function AddEvent(target: any, eventType: string, handler: any) {
        if (target.addEventListener) {
            target.addEventListener(eventType, handler, false);
        }
        else if (target.attachEvent) {
            target.attachEvent("on" + eventType, handler);
        }
    }

    export function GetRandomNumber(low: number, high: number, flt: boolean): number{
        var retVal: number = Math.random() * (high - (low - 1)) + low;

        if (!flt) {
            retVal = Math.floor(retVal);
        }
        return retVal;
    }

    export function GetAtoZ(): any{
        var startingChar = 97
            , i = 0
            ,AZList = [];

        for (; i < 26; i++) {
            AZList.push(String.fromCharCode(startingChar + i));
        }

        return AZList;
    }
}