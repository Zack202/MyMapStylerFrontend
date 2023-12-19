import jsTPS_Transaction from "../common/jsTPS.js"

export default class MapFeatureEdits_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldEdits, initNewEdits) {
        super();
        this.store = initStore;
        this.oldEdits = initOldEdits;
        this.newEdits = initNewEdits;
    }

    doTransaction() {
        //store.updateMapFeatures = function (id, mapZoom, mapCenter, priColor)
        this.store.editMapAttributesADV(this.newEdits)
        console.log('after do in transaction class')
    }
    
    undoTransaction() {
        this.store.editMapAttributesADV( this.oldEdits)
        console.log('after undo in transaction class')
    }
}