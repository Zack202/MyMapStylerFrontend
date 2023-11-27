import api from './store-request-api'
import { createContext, useContext, useState } from 'react'
import AuthContext from '../auth'

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
    CREATE_MAP_MODAL: 'CREATE_MAP_MODAL'

}

const CurrentModal = {
    NONE: 'NONE',
    EXPORT_MAP: 'EXPORT_MAP',
    IMPORT_MAP_DATA: 'RT_MAP_DAT',
    MAP_DATA_EDITING: 'MAP_DATA_EDITING',
    DELETE_MAP_MODAL: 'DELETE_MAP_MODAL',
    CREATE_NEW_MAP: 'CREATE_NEW_MAP',
    CHANGE_ACCOUNT_INFO: 'CHANGE_ACCOUNT_INFO'
}

function GlobalStoreContextProvider(props) {

    const authContext = useContext(AuthContext);
    const { auth } = authContext;

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
        filters: [],
        currentEditColor: null,
        currentMapIndex: -1,
        currentMapType: -1

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
                    filters: [],
                    currentEditColor: null,
                    currentMapIndex: -1,
                    currentMapType: -1
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
                    filters: [],
                    currentEditColor: null,
                    currentMapIndex: -1,
                    currentMapType: -1
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
                    filters: [],
                    currentEditColor: null,///???
                    currentMapIndex: -1, ///????
                    currentMapType: payload.mapType
                });
            }
            default:
                return store;
        }
    }

    // create a new map
    store.createNewMap = async function (mapname, mapData, mapType) { //input map data and map type
        //let newMapName = "Untitled";//+ store.newListCounter;
        //name, userName, ownerEmail, mapData, mapType
        let newMapName = "Untitled" 
        let userName = auth.user.userName //MMM
        let ownerEmail = auth.user.email //mango@gmail.com
        const response = await api.createNewMap(newMapName, userName, ownerEmail, mapData, mapType);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            // response.data. map
            //update store with reducer
            
            //);
            console.log('success')

            // if success bring to map editing screen
        }
        else {
            console.log("API FAILED TO CREATE A NEW MAP");
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
    
    store.updateMapFeatures = function (id, mapZoom, mapCenter) { //will add other features?
        //get map
        async function asyncUpdateMapFeatures(id){
            let response = await api.getMapById(id);
            if(response.data.success){
                let map = response.data.map;
                map.mapZoom = mapZoom;
                map.mapCenter = mapCenter;
                async function updateMap(map){
                    response = await api.updateMapById(id, map);
                    if(response.data.success){
                        //bring to map edit screen
                    }
                }
                updateMap(map);
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