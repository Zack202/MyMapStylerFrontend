import api from './store-request-api'
import { createContext, useContext, useState } from 'react'
import AuthContext from '../auth'
import { useRouter } from 'next/navigation';
import jsondiffpatch from 'jsondiffpatch'
import jsTPS from '../common/jsTPS'
import ChangePriColor_Transaction from '../transactions/ChangePriColor_Transaction'

export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

export const GlobalStoreActionType = {
    //from front-end component design
    CHANGE_MAP_NAME: 'CHANGE_MAP_NAME',
    CLOSE_CURRENT_MAP: 'CLOSE_CURRENT_MAP',
    CREATE_MAP_LIST: 'CREATE_MAP_LIST',
    LOAD_ID_NAME_PAIRS: 'LOAD_ID_NAME_PAIRS',
    MARK_MAP_FOR_DELETION: 'MARK_MAP_FOR_DELETION',
    SET_CURRENT_MAP: 'SET_CURRENT_MAP',
    SET_MAP_NAME_EDIT_ACTIVE: 'SET_MAP_NAME_EDIT_ACTIVE',
    EDIT_MAP: 'EDIT_MAP',
    HIDE_MODALS: 'HIDE_MODALS',
    PUBLISHED: 'PUBLISHED',
    GUEST: 'GUEST',
    SORT: 'SORT',
    ADD_DATA_PROPS: 'ADD_DATA_PROPS',
    EXPORT_MAP: 'EXPORT_MAP',
    FILTER: 'FILTER',
    CREATE_MAP_MODAL: 'CREATE_MAP_MODAL',
    UPDATE_MAP: 'UPDATE_MAP',
    UPDATE_SEARCH: 'UPDATE_SEARCH',
    UPDATE_FILTER: 'UPDATE_FILTER',

}

const tps = new jsTPS();

const CurrentModal = {
    NONE: 'NONE',
    EXPORT_MAP: 'EXPORT_MAP',
    IMPORT_MAP_DATA: 'RT_MAP_DAT',
    MAP_DATA_EDITING: 'MAP_DATA_EDITING',
    DELETE_MAP_MODAL: 'DELETE_MAP_MODAL',
    CREATE_NEW_MAP: 'CREATE_NEW_MAP',
    CHANGE_ACCOUNT_INFO: 'CHANGE_ACCOUNT_INFO',   
}

function GlobalStoreContextProvider(props) {

    const authContext = useContext(AuthContext);
    const { auth } = authContext;
    const router = useRouter()

    const [store, setStore] = useState({
        //what the store is going to manage
        // ie current modals, maps, current map etc
        currentModal: CurrentModal.NONE,
        idNamePairs: [],
        currentMap: null,
        currentMapFeatures: JSON,
        currentMapGeometry: JSON,
        mapIdMarkedForDeletion: null,
        mapMarkedForDeletion: null,
        mapIdMarkedForExport: null,
        mapMarkedForExport: null,
        sort: "name",
        filter: [],
        currentEditColor: null,
        currentMapIndex: -1,
        currentMapType: -1,
        search: "",

    });


    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.CREATE_MAP: {
                return setStore({
                    currentModal: CurrentModal.CREATE_MAP_MODAL,
                    idNamePairs: [],
                    currentMap: null, //change
                    currentMapFeatures: JSON,
                    currentMapGeometry: JSON,
                    mapIdMarkedForDeletion: null,
                    mapMarkedForDeletion: null,
                    mapIdMarkedForExport: null,
                    mapMarkedForExport: null,
                    sort: "name",
                    filter: [],
                    currentEditColor: null,
                    currentMapIndex: -1,
                    currentMapType: -1,
                    search: "",
                })
            }
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS:{
                return setStore({
                    currentModal: null,
                    idNamePairs: payload,
                    currentMap: null, //change
                    currentMapFeatures: JSON,
                    currentMapGeometry: JSON,
                    mapIdMarkedForDeletion: null,
                    mapMarkedForDeletion: null,
                    mapIdMarkedForExport: null,
                    mapMarkedForExport: null,
                    sort: "name",
                    filter: [],
                    currentEditColor: null,
                    currentMapIndex: -1,
                    currentMapType: -1,
                    search: "",
                })
            }
            case GlobalStoreActionType.MARK_MAP_FOR_DELETION:{
                return setStore({
                currentModal: null,
                idNamePairs: store.idNamePairs,
                currentMap: null, //change
                currentMapFeatures: JSON,
                currentMapGeometry: JSON,
                mapIdMarkedForDeletion: payload,
                mapMarkedForDeletion: null,
                mapIdMarkedForExport: null,
                mapMarkedForExport: null,
                sort: "name",
                filter: [],
                currentEditColor: null,
                currentMapIndex: -1,
                currentMapType: -1,
                search: "",
                })
            }

            //for now this is just for going to edit map screen, not updating a map
            case GlobalStoreActionType.SET_CURRENT_MAP:{
                return setStore({
                    currentModal: null,
                    idNamePairs: store.idNamePairs,
                    currentMap: payload,
                    currentMapFeatures: JSON, //might need to change this
                    currentMapGeometry: JSON, //might need to change this
                    mapIdMarkedForDeletion: null,
                    mapMarkedForDeletion: null,
                    mapIdMarkedForExport: null,
                    mapMarkedForExport: null,
                    sort: "name",
                    filter: [],
                    currentEditColor: null,///???
                    currentMapIndex: -1, ///????
                    currentMapType: payload.mapType,
                    search: "",
                });
            }
            case GlobalStoreActionType.PUBLISHED:{
                return setStore({
                    currentModal: null,
                    idNamePairs: store.idNamePairs,
                    currentMap: null,
                    currentMapFeatures: JSON, //might need to change this
                    currentMapGeometry: JSON, //might need to change this
                    mapIdMarkedForDeletion: null,
                    mapMarkedForDeletion: null,
                    mapIdMarkedForExport: null,
                    mapMarkedForExport: null,
                    sort: "name",
                    filters: [],
                    currentEditColor: null,///???
                    currentMapIndex: -1, ///????
                    currentMapType: payload.mapType,
                    search: ""
                });
            }
            case GlobalStoreActionType.UPDATE_MAP:{
                return setStore({
                    currentModal: null,
                    idNamePairs: store.idNamePairs,
                    currentMap: payload,
                    currentMapFeatures: JSON, //might need to change this
                    currentMapGeometry: JSON, //might need to change this
                    mapIdMarkedForDeletion: null,
                    mapMarkedForDeletion: null,
                    mapIdMarkedForExport: null,
                    mapMarkedForExport: null,
                    sort: "name",
                    filter: [],
                    currentEditColor: null,///???
                    currentMapIndex: -1, ///????
                    currentMapType: store.currentMapType,
                    search: "",
                });
            }
            case GlobalStoreActionType.UPDATE_SEARCH:{
                return setStore({
                    currentModal: null,
                    idNamePairs: store.idNamePairs,
                    currentMap: null, //change
                    currentMapFeatures: JSON, //might need to change this
                    currentMapGeometry: JSON, //might need to change this
                    mapIdMarkedForDeletion: null,
                    mapMarkedForDeletion: null,
                    mapIdMarkedForExport: null,
                    mapMarkedForExport: null,
                    sort: "name",
                    filter: store.filter,
                    currentEditColor: null,///???
                    currentMapIndex: -1, ///????
                    currentMapType: store.currentMapType,
                    search: payload,
                });
            }
            case GlobalStoreActionType.UPDATE_FILTER:{
                return setStore({
                    currentModal: null,
                    idNamePairs: store.idNamePairs,
                    currentMap: null, //change
                    currentMapFeatures: JSON, //might need to change this
                    currentMapGeometry: JSON, //might need to change this
                    mapIdMarkedForDeletion: null,
                    mapMarkedForDeletion: null,
                    mapIdMarkedForExport: null,
                    mapMarkedForExport: null,
                    sort: "name",
                    filter: payload,
                    currentEditColor: null,///???
                    currentMapIndex: -1, ///????
                    currentMapType: store.currentMapType,
                    search: store.search, // ?!?
                });
            }
            default:
                return store;
        }
    }

    // create a new map                                             
    store.createNewMap = async function (mapName, mapData, mapType, mapDesc) { //input map data and map type
        //let newMapName = "Untitled";//+ store.newListCounter;
        //name, userName, ownerEmail, mapData, mapType
        //creat new map
            let newMapName = mapName
            let newMapDesc = mapDesc
            let userName = auth.user.userName //MMM
            let ownerEmail = auth.user.email //mango@gmail.com
            const response = await api.createNewMap(newMapName, userName, ownerEmail, mapData, mapType, newMapDesc);
            console.log("createNewList response: " + response);
            if (response.status === 201) {
                console.log('success')
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_MAP,
                    payload: response.data.map
                });
                // if success bring to map editing screen
                router.push('/mapEditing/'+ response.data.map._id)
            
        }
        else {
            console.log("API FAILED TO CREATE A NEW MAP");
        }
    }

    store.forkMap = async function(dupMap){
        //duplicate a map
        
           let response = await api.getMapById(dupMap);
       
           if(response.data.success){
               dupMap = response.data.map;
               let counter = 2;
               let check = true;
               // new name for the dup map with a system of [name](2) -> [name](3) and so on
               let dupName = dupMap.name + "(" + counter.toString() + ")";
               while(check){
                   if(this.idNamePairs.length === 0)
                       break;
                   for(let i = 0; i < this.idNamePairs.length; i++){
                       if(this.idNamePairs[i].name === dupName){
                           counter += 1;
                           dupName = dupMap.name + "(" + counter.toString() + ")";
                           break;
                       }
                       else if (i === this.idNamePairs.length - 1) check = false
                   }
       
           }
           let userName = auth.user.userName //MMM
           let ownerEmail = auth.user.email //mango@gmail.com
           // console.log(dupMap.mapGeometry);
           let mapData = dupMap.mapGeometry;
           let mapFeatures = dupMap.mapFeatures;
           let mapType = dupMap.mapType;
           let mapDesc = dupMap.description;
       
           response = await api.createNewMap(dupName, userName, ownerEmail, mapData, mapType, mapDesc, mapFeatures);
           console.log("createNewList response: " + response);
           if (response.status === 201) {
               console.log('success')
               storeReducer({
                   type: GlobalStoreActionType.SET_CURRENT_MAP,
                   payload: response.data.map
               });
               // if success bring to map editing screen
               router.push('/mapEditing/'+ response.data.map._id)
           
           }
           else {
               console.log("API FAILED TO CREATE A NEW MAP");
           }
       }
           }

    store.setCurrentMap = function (id) {
        async function asyncSetCurrentMap(id) {
            let response = await api.getMapById(id);
            if(response.data.success){
                let map = response.data.map;
                //in playlister the equivilent function uses updateplaylistbyid as well to clear transaction stack 
                //will leave that functionality out for now since we don't have a transaction stack
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_MAP,
                    payload: map
                });
                //route to map editing screen
            }
        }
        asyncSetCurrentMap(id)
    }
    
    store.updateMapFeatures = function (id, priColor) { //will add other features?
        //get map
        async function asyncUpdateMapFeatures(id){
            let response = await api.getMapById(id);
            if(response.data.success){
                let map = response.data.map;
                if(map.mapFeatures == null){
                    map.mapFeatures = {edits: {priColor: priColor}}
                }
                else{
                    map.mapFeatures.edits.priColor = priColor;
                }
                 //let diff = jsondiffpatch.diff(store.currentMap, map);
                 async function updateMap(mapmapFeatures){
                    response = await api.updateMapFeaturesById(id, mapmapFeatures);
                    if(response.data.success){
                        //update store
                        storeReducer({
                            type: GlobalStoreActionType.UPDATE_MAP,
                            payload: map
                        }) 
                        //bring to map edit screen?
                        console.log('update map store')
                    }
                }
                updateMap(map.mapFeatures);
            }

        }
        asyncUpdateMapFeatures(id)
    
    }
    
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getMapPairs();
            if (response.data.success) {
                console.log(response.data.idNamePairs)
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
        console.log('outside async pair id function')
        console.log(store.idNamePairs)
    }

    ///MODAL STUFF
    store.showCreateMapModal = function () {
        storeReducer({
            type: GlobalStoreActionType.CREATE_MAP_MODAL,
            payload: {}
        })
    }

    store.hideModals = () => {
        storeReducer({
            type:GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        })
    }

    store.isCreateMapModalOpen = () => {
        return store.currentModal === CurrentModal.CREATE_NEW_MAP;
        //return true;
    }

    store.unMarkMapForDeletion = () => {
        storeReducer({
            type: GlobalStoreActionType.MARK_MAP_FOR_DELETION,
            payload: null
        })
    }

    store.markMapForDeletion = (id) => {
        storeReducer({
            type: GlobalStoreActionType.MARK_MAP_FOR_DELETION,
            payload: id
        })
    }

    store.deleteMap = () => {
        async function asyncDeleteMap(id){
            let response = await api.deleteMap(id);
            if(response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.MARK_MAP_FOR_DELETION,
                    payload: null
                }) 
            }
            store.loadIdNamePairs();
        }
        asyncDeleteMap(store.mapIdMarkedForDeletion);
    }

    store.updateMapName = (name) => {
        //Create diff of current map and new map
        let newMap = { ...store.currentMap };
        newMap.name = name;
        let diff = jsondiffpatch.diff(store.currentMap, newMap);
        async function asyncUpdateMapName(nameDiff){
            let response = await api.updateMapById(store.currentMap._id, diff);
            if(response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.UPDATE_MAP,
                    payload: newMap
                }) 
            }
        }
        asyncUpdateMapName(diff);
    }

    store.likeMap = function(mapId, liked){
        async function likeMap(mapId){
            let response = await api.getMapById(mapId);
            if(response.data.success){
                let obj1 = {
                    liked: liked
                }
                let obj2 = {
                    liked: !liked
                }
                
                let map = {...response.data.map};
                let diff = jsondiffpatch.diff(obj1, obj2);
                response = await api.updateMapById(mapId, diff);
                if(response.data.success){
                    let pairsArray = response.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.PUBLISHED,
                        payload:{ 
                            idNamePairs: pairsArray,
                            map: map
                        }
                    });
                        store.loadIdNamePairs();
                }
            }
        }
        likeMap(mapId)
    }

    store.dislikeMap = function(mapId){

    }
    
    store.updateMapAttributes = (mapColor, borderSwitch, borderWidth, borderColor, regionSwitch, regionNameColor, backgroundColor, center, zoom) => {
        const updatedAttributes = {
            mapColor,
            borderSwitch,
            borderWidth,
            borderColor,
            regionSwitch,
            regionNameColor,
            backgroundColor,
            center,
            zoom,
          };
        
          // Loop through the updated attributes and store them in store.currentMap.mapFeatures.edits
          for (const key in updatedAttributes) {
            if (Object.prototype.hasOwnProperty.call(updatedAttributes, key)) {
              store.currentMap.mapFeatures.edits[key] = updatedAttributes[key];
            }
          }

        async function asyncUpdateMapAttributes(attributes){
            let response = await api.updateMapAttributesById(store.currentMap._id, attributes);
            if(response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.UPDATE_MAP,
                    payload: store.currentMap
                }) 
            }
        }
        asyncUpdateMapAttributes(store.currentMap.mapFeatures);
    }

    store.publishMap = function(id) {
        async function asyncPublishMap(id){
            let response = await api.getMapById(id);
            if(response.data.success){
                let map = { ...response.data.map};
                map.published = true;
                let diff = jsondiffpatch.diff(map, response.data.map)
                async function updateMap(diff){
                    response = await api.updateMapById(id, diff);
                    if(response.data.success){
                        response = await api.getMapPairs();
                        if(response.data.success){
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.PUBLISHED,
                                payload:{ 
                                    idNamePairs: pairsArray,
                                    map: map
                                }
                            });
                        store.loadIdNamePairs();

                        }
                    }
                }
                updateMap(diff);
            }
        }
        asyncPublishMap(id)
    }

    // Search and Filter
    store.updateSearch = (search) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_SEARCH,
            payload: search
        }) 
    }
    store.updateFilter = (filter) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_FILTER,
            payload: filter
        }) 
    }
    store.getMapById = async (id) => {
        let response = await api.getMapById(id);
        return response;
    }

    //Transaction stack functions
    store.addChangePriColorTransaction = function (oldColor, newColor)  {
        console.log('add transaction to stack')//Create transaction and add to stack
        let transaction = new ChangePriColor_Transaction(store, oldColor, newColor);
        tps.addTransaction(transaction);
        
    }

    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };