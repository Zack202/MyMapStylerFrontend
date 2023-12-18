import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * 
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class BorderEdits_Transaction extends jsTPS_Transaction {
    constructor(initStore, initoldSB, initnewSB, initoldBC, initnewBC, initoldBW, initnewBW) {
        super();
        this.store = initStore;

        //SB: show border, BC: border color, BW: border width
        this.oldSB = initoldSB;
        this.newSB = initnewSB;

        this.oldBC = initoldBC;
        this.newBC = initnewBC;

        this.oldBW = initoldBW;
        this.newBW = initnewBW;
        
    }

    doTransaction() {
        this.store.updateBorderFeatures( this.newSB, this.newBC, this.newBW)
        console.log('do border edits')
    }
    
    undoTransaction() {
        this.store.updateBorderFeatures( this.oldSB, this.oldBC, this.oldBW)
        console.log('undo border edits')
    }
}