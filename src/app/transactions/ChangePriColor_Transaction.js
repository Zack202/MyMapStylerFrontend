import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * 
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
        //store.updateMapFeatures = function (id, mapZoom, mapCenter, priColor)
        this.store.updateMapFeatures(this.store.currentMap._id, this.newColor)
        console.log(this.newColor)
        console.log('after do in transaction class')
    }
    
    undoTransaction() {
        this.store.updateMapFeatures(this.store.currentMap._id, this.oldColor)
        console.log(this.oldColor)
        console.log('after undo in transaction class')
    }
}