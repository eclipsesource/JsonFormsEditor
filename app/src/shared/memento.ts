abstract class Memento {

}

interface Originator<E extends Memento> {
    setMemento(memento:E);

    createMemento():E;
}