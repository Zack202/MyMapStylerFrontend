import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * 
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class MapFeatureEdits_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldEdits, initNewEdits) {
        super();
        this.store = initStore;
        this.oldEdits = initOldEdits;
        this.newEdits = initNewEdits;
    }

    doTransaction() {
        //store.updateMapFeatures = function (id, mapZoom, mapCenter, priColor)
        this.store.editMapAttributes(this.newEdits)
        console.log('after do in transaction class')
    }
    
    undoTransaction() {
        this.store.editMapAttributes( this.oldEdits)
        console.log('after undo in transaction class')
    }
}