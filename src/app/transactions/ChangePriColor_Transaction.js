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
        this.store.updateMapFeatures(this.store.currentMap._id, this.store.currentMap.mapZoom, this.store.currentMap.mapCenter, this.newColor)
        console.log('after update map features in transaction class')
    }
    
    undoTransaction() {
        this.store.updateMapFeatures(this.store.currentMap._id, this.store.currentMap.mapZoom, this.store.currentMap.mapCenter, this.oldColor)
    }
}