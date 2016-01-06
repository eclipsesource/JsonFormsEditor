/// <reference path="../../../typings/lodash/lodash.d.ts" />

interface Observer<T> {
    update(data:T);
}

abstract class Observable<T> {
    private observers:Observer<T>[] = [];

    registerObserver(observer:Observer<T>):void {
        this.observers.push(observer);
    }

    removeObserver(observer:Observer<T>):void {
        _.remove(this.observers, observer);
    }

    notifyObservers(data:T):void {
        _.forEach(this.observers, (observer:Observer<T>) => {
            observer.update(data);
        });
    }
}