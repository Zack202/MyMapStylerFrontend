import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * CreateSong_Transaction
 * 
 * This class represents a transaction that creates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class ChangePriColor_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldColor, initNewColor) {
        super();
        this.store = initStore;
        this.oldColor = initOldColor;
        this.newColor = initNewColor;
    }

    doTransaction() {
        this.store.changePriColor(initNewColor)
    }
    
    undoTransaction() {
        this.store.changePriColor(initOldColor)
    }
}