import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * 
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class EditMapAttributes_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldAtt, initNewAtt) {
        super();
        this.store = initStore;
        this.oldAtt = initOldAtt;
        this.newAtt = initNewAtt;
    }

    doTransaction() {
        this.store.editMapAttributes(this.newAtt)
        console.log('after update map features in transaction class')
    }
    
    undoTransaction() {
        this.store.editMapAttributes(this.oldAtt)
        console.log('undo transaction')
    }
}