/// <reference path="../../../typings/lodash/lodash.d.ts" />
var Observable = (function () {
    function Observable() {
        this.observers = [];
    }
    Observable.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    };
    Observable.prototype.removeObserver = function (observer) {
        _.remove(this.observers, observer);
    };
    Observable.prototype.notifyObservers = function (data) {
        _.forEach(this.observers, function (observer) {
            observer.update(data);
        });
    };
    return Observable;
})();
