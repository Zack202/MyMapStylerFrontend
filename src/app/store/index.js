import api from './store-request-api'
import { createContext, useContext, useState } from 'react'
import AuthContext from '../auth'
import { useRouter } from 'next/navigation';
import jsondiffpatch from 'jsondiffpatch'
import jsTPS from '../common/jsTPS'
import MapFeaturesEdits_Transaction from '../transactions/MapFeaturesEdits_Transaction'

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
    UPDATE_SORT: 'UPDATE_SORT',
    UPDATE_SEARCH: 'UPDATE_SEARCH',
    UPDATE_FILTER: 'UPDATE_FILTER',
    CREATE_MAP_ERROR: 'CREATE_MAP_ERROR'

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
        sort: "Likes",
        filter: [],
        currentEditColor: null,
        currentMapIndex: -1,
        currentMapType: -1,
        search: "",
        errorFound: ""
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
                    sort: store.sort,
                    filter: store.filter,
                    currentEditColor: null,
                    currentMapIndex: -1,
                    currentMapType: -1,
                    search: store.search,
                    errorFound: store.errorFound,
                })
            }
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal: null,
                    idNamePairs: payload,
                    currentMap: store.currentMap, //change
                    currentMapFeatures: JSON,
                    currentMapGeometry: JSON,
                    mapIdMarkedForDeletion: null,
                    mapMarkedForDeletion: null,
                    mapIdMarkedForExport: null,
                    mapMarkedForExport: null,
                    sort: store.sort,
                    filter: store.filter,
                    currentEditColor: null,
                    currentMapIndex: -1,
                    currentMapType: -1,
                    search: store.search,
                    errorFound: store.errorFound,
                })
            }
            case GlobalStoreActionType.MARK_MAP_FOR_DELETION: {
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
                    sort: store.sort,
                    filter: store.filter,
                    currentEditColor: null,
                    currentMapIndex: -1,
                    currentMapType: -1,
                    search: store.search,
                    errorFound: "",
                })
            }

            //for now this is just for going to edit map screen, not updating a map
            case GlobalStoreActionType.SET_CURRENT_MAP: {
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
                    sort: store.sort,
                    filter: store.filter,
                    currentEditColor: null,///???
                    currentMapIndex: -1, ///????
                    currentMapType: payload.mapType,
                    search: store.search,
                    errorFound: "",
                });
            }
            case GlobalStoreActionType.PUBLISHED: {
                return setStore({
                    currentModal: null,
                    idNamePairs: store.idNamePairs,
                    currentMap: store.currentMap,
                    currentMapFeatures: JSON, //might need to change this
                    currentMapGeometry: JSON, //might need to change this
                    mapIdMarkedForDeletion: null,
                    mapMarkedForDeletion: null,
                    mapIdMarkedForExport: null,
                    mapMarkedForExport: null,
                    sort: store.sort,
                    filters: store.filter,
                    currentEditColor: null,///???
                    currentMapIndex: -1, ///???? 
                    currentMapType: payload.mapType,
                    search: store.search,
                    errorFound: "",
                });
            }
            case GlobalStoreActionType.UPDATE_MAP: {
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
                    sort: store.sort,
                    filter: store.filter,
                    currentEditColor: null,///???
                    currentMapIndex: -1, ///????
                    currentMapType: store.currentMapType,
                    search: store.search,
                    errorFound: "",
                });
            }
            case GlobalStoreActionType.UPDATE_SORT: {
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
                    sort: payload,
                    filter: store.filter,
                    currentEditColor: null,///???
                    currentMapIndex: -1, ///????
                    currentMapType: store.currentMapType,
                    search: store.search,
                    errorFound: "",
                });
            }
            case GlobalStoreActionType.UPDATE_SEARCH: {
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
                    sort: store.sort,
                    filter: store.filter,
                    currentEditColor: null,///???
                    currentMapIndex: -1, ///????
                    currentMapType: store.currentMapType,
                    search: payload,
                    errorFound: "",
                });
            }
            case GlobalStoreActionType.UPDATE_FILTER: {
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
                    sort: store.sort,
                    filter: payload,
                    currentEditColor: null,///???
                    currentMapIndex: -1, ///????
                    currentMapType: store.currentMapType,
                    search: store.search, // ?!?
                    errorFound: "",
                });
            }
            case GlobalStoreActionType.CREATE_MAP_ERROR: {
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
                    sort: store.sort,
                    filter: store.filter,
                    currentEditColor: null,///???
                    currentMapIndex: -1, ///????
                    currentMapType: store.currentMapType,
                    search: store.search, // ?!?
                    errorFound: payload.errorMessage,
                });
            }
            default:
                return store;
        }
    }

    store.unErrorFound = async function (){
        storeReducer({
            type: GlobalStoreActionType.CREATE_MAP_ERROR,
            payload: {
                errorMessage: ""
            }
            }
        );
    }

    // create a new map                                             
    store.createNewMap = async function (mapName, mapData, mapType, mapDesc, mapFeatures) { //input map data and map type
        //let newMapName = "Untitled";//+ store.newListCounter;
        //name, userName, ownerEmail, mapData, mapType
        //creat new map
        try {
        let newMapName = mapName
        let newMapDesc = mapDesc
        let userName = auth.user.userName //MMM
        let ownerEmail = auth.user.email //mango@gmail.com
        const response = await api.createNewMap(newMapName, userName, ownerEmail, mapData, mapType, newMapDesc, mapFeatures);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            console.log('success')
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_MAP,
                payload: response.data.map
            });
            // if success bring to map editing screen
            router.push('/mapEditing/' + response.data.map._id)

        }
    } catch (error) { 
            console.log("ERROR:", error);
            try{
                storeReducer({
                    type: GlobalStoreActionType.CREATE_MAP_ERROR,
                    payload: {
                        errorMessage: error.response.data.errorMessage
                    }
                })
            }
            catch (error2) {
                storeReducer({
                    type: GlobalStoreActionType.CREATE_MAP_ERROR,
                    payload: {
                        errorMessage: "Please Fill Out All Sections of the Form"
                    }
                })
            }
                
        }

            
    }
    

    store.forkMap = async function (dupMap) {
        //duplicate a map

        let response = await api.getMapById(dupMap);

        if (response.data.success) {
            dupMap = response.data.map;
            const regex = /\(\d+\)$/; 
            let newName;
            if (regex.test(dupMap.name)) {
              newName = dupMap.name.replace(regex, (match) => `(${parseInt(match.slice(1, -1)) + 1})`);
            } else {
              newName = `${dupMap.name}(1)`;
            }
            let userName = auth.user.userName //MMM
            let ownerEmail = auth.user.email //mango@gmail.com
            // console.log(dupMap.mapGeometry);
            let mapData = dupMap.mapGeometry;
            let mapFeatures = dupMap.mapFeatures;
            let mapType = dupMap.mapType;
            let mapDesc = dupMap.description;

            response = await api.createNewMap(newName, userName, ownerEmail, mapData, mapType, mapDesc, mapFeatures);
            console.log("createNewList response: " + response);
            if (response.status === 201) {
                console.log('success')
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_MAP,
                    payload: response.data.map
                });
                // if success bring to map editing screen
                router.push('/mapEditing/' + response.data.map._id)
                store.loadIdNamePairs();

            }
            else {
                console.log("API FAILED TO CREATE A NEW MAP");
            }
        }
    }

    store.setCurrentMap = function (id) {
        async function asyncSetCurrentMap(id) {
            let response = await api.getMapById(id);
            if (response.data.success) {
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

    store.loadPublishedIdNamePairs = function () {
        async function asyncLoadPublishedIdNamePairs() {
            const response = await api.getPublishedMapPairs();
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
        asyncLoadPublishedIdNamePairs();
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
            type: GlobalStoreActionType.HIDE_MODALS,
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
        async function asyncDeleteMap(id) {
            let response = await api.deleteMap(id);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.MARK_MAP_FOR_DELETION,
                    payload: null
                })
            }
            store.loadIdNamePairs();
        }
        asyncDeleteMap(store.mapIdMarkedForDeletion);
    }

    store.takeAdditionalData = (file, selectedOption) => {
        //Spilt based on selected option, file is .csv
        const reader = new FileReader();
        if (selectedOption === "Additional Region Data") { // Additional region data entered
            reader.onload = function (e) {
                const content = e.target.result;
                const rows = content.split("\n");
                const columns = rows[0].split(",").map(column => column.trim()); //Extract column
            
                const featuresADV = JSON.parse(JSON.stringify(store.currentMap.mapFeatures.ADV));
            
                //Populate all regions props
                for (const region in featuresADV) {
                    if (Object.prototype.hasOwnProperty.call(featuresADV, region)) {
                        if (!featuresADV[region][0]) {
                            featuresADV[region][0] = {}; // If no properties, create an empty object
                        }
                        for (let j = 1; j < columns.length; j++) {
                            const column = columns[j];
                            if (!featuresADV[region][0].hasOwnProperty(column)) {
                                featuresADV[region][0][column] = ''; //'' if no value
                            }
                        }
                    }
                }
            
                // Update properties for regions listed in the CSV
                for (let i = 1; i < rows.length; i++) {
                    const data = rows[i].split(",");
            
                    //Row contains data
                    if (data.length === columns.length) {
                        const region = data[0].trim();
            
                        if (featuresADV[region]) {
                            if (!featuresADV[region][0]) {
                                featuresADV[region][0] = {};
                            }
            
                            for (let j = 1; j < columns.length; j++) {
                                const column = columns[j];
                                const value = data[j] ? data[j].trim() : '';
            
                                //Update property only if it exists in the current map
                                if (featuresADV[region][0].hasOwnProperty(column)) {
                                    featuresADV[region][0][column] = value;
                                }
                            }
                        }
                    }
                }
            
                let updatedMap = { ...store.currentMap };
                updatedMap.mapFeatures.DP = store.currentMap.mapFeatures.DP;
                updatedMap.mapFeatures.edits = store.currentMap.mapFeatures.edits;
                updatedMap.mapFeatures.ADV = featuresADV

                store.updateCurrentMapLocally(updatedMap);
            }
        } else {
            reader.onload = function (e) {
                const content = e.target.result;
                const rows = content.split("\n");

                const dataPoints = store.currentMap && store.currentMap.mapFeatures && store.currentMap.mapFeatures.DP ? store.currentMap.mapFeatures.DP : [];
                for (let i = 0; i < rows.length; i++) {
                    const columns = rows[i].split(",");
                    if (columns.length >= 2) {
                        const latitude = parseFloat(columns[0].trim());
                        const longitude = parseFloat(columns[1].trim());
                        
                        if( store.currentMap && store.currentMap.mapType && store.currentMap.mapType === 2){ //size dot map
                            if(columns[3] && columns[3].trim() !== undefined){
                                const value = parseFloat(columns[3].trim());
                                if(!isNaN(value)&& !isNaN(latitude) && !isNaN(longitude)){
                                    dataPoints.push([latitude, longitude, value]);
                                }
                            } else {
                                console.log("no value for sized dot map")
                                const value = 0;
                                if(!isNaN(value)&& !isNaN(latitude) && !isNaN(longitude)){
                                    dataPoints.push([latitude, longitude, value]);
                                }
                            }
                        }else{

                        if (!isNaN(latitude) && !isNaN(longitude)) {
                            dataPoints.push([ latitude, longitude ]);
                        }
                    }
                    }
                }


                if (!store.currentMapFeatures) {
                    store.currentMapFeatures = {
                        features: {
                            DP: [],
                            ADV: {},
                            edits: {}
                        },
                    };
                }
                let updatedMap = { ...store.currentMap };
                updatedMap.mapFeatures.DP = dataPoints;
                updatedMap.mapFeatures.edits = store.currentMap.mapFeatures.edits;
                updatedMap.mapFeatures.ADV = store.currentMap.mapFeatures.ADV;

                store.updateCurrentMapLocally(updatedMap)
                //store.currentMapFeatures.features.DP.push(...dataPoints);
            }
        }
        reader.readAsText(file);
    }

    store.updateMapWithData = (features, selectedOption) => {
        if (selectedOption === "Additional Region Data") {
            features = JSON.stringify({ regions: features });
        } else {
            features = JSON.stringify({ DP: features });
        }
        async function asyncUpdateMap(features, selectedOption) {
            let response = await api.updateMapFeaturesById(store.currentMap._id, features, selectedOption);
            if (response.data.success) {
                // storeReducer({ //should not be updating map, already updated
                //     type: GlobalStoreActionType.UPDATE_MAP_FEATURES,
                //     payload: dummyFeatures
                // }) 
            }
        }
        asyncUpdateMap(features, selectedOption);
    }

    store.updateMapAddTransaction = () => { //Add update map transaction to transaction stack
        let transaction = new UpdateMapTransaction(this, store.currentMap._id, store.diff);
        tps.addTransaction(transaction);
    }

    store.updateMapName = (name) => {
        //Create diff of current map and new map
        let newMap = { ...store.currentMap };
        newMap.name = name;
        let diff = jsondiffpatch.diff(store.currentMap, newMap);
        async function asyncUpdateMapName(nameDiff) {
            let response = await api.updateMapById(store.currentMap._id, nameDiff);
            if (response.data.success) {
                storeReducer({ //should not be updating map, already updated
                    type: GlobalStoreActionType.UPDATE_MAP,
                    payload: newMap
                })
            }
        }
        asyncUpdateMapName(diff);
    }

    store.updateMapDescription = (id, description, oldDescription) => {
        //Create diff of current map and new map
        let newMap = { 
            _id: id,
            description: description,
        }
        let oldMap = {
            _id: id,
            description: oldDescription,
        }
        let diff = jsondiffpatch.diff(oldMap,newMap);
        async function asyncUpdateMapName(nameDiff) {
            let response = await api.updateMapById(id, nameDiff);
            if (response.data.success) {
                storeReducer({ //should not be updating map, already updated
                    type: GlobalStoreActionType.UPDATE_MAP,
                    payload: newMap
                })
            }
        }
        asyncUpdateMapName(diff);
    }

    store.likeMap = function (mapId, location, userName) {
        async function likeMap(mapId) {
            let response = await api.getMapById(mapId);
            if (response.data.success) {
                let obj1 = {
                    liked: true,
                    userName: userName
                }
                let obj2 = {
                    liked: false,
                    userName: ""
                }

                let map = { ...response.data.map };
                let diff = jsondiffpatch.diff(obj1, obj2);
                response = await api.updateMapById(mapId, diff);
                if (response.data.success) {
                    let pairsArray = response.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.PUBLISHED,
                        payload: {
                            idNamePairs: pairsArray,
                            map: map
                        }
                    });
                    if (location === "home") {
                        console.log("home");
                        store.loadIdNamePairs();
                    }
                    else {
                        console.log("browser");
                        store.loadPublishedIdNamePairs();
                    }
                }
            }
        }
        likeMap(mapId)
    }

    store.dislikeMap = function (mapId, location, userName) {
        async function dislikeMap(mapId) {
            let response = await api.getMapById(mapId);
            if (response.data.success) {
                let obj1 = {
                    disliked: true,
                    userName: userName
                }
                let obj2 = {
                    disliked: false,
                    userName: ""
                }

                let map = { ...response.data.map };
                let diff = jsondiffpatch.diff(obj1, obj2);
                response = await api.updateMapById(mapId, diff);
                if (response.data.success) {
                    let pairsArray = response.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.PUBLISHED,
                        payload: {
                            idNamePairs: pairsArray,
                            map: map
                        }
                    });
                    if (location === "home") {
                        console.log("home");
                        store.loadIdNamePairs();
                    }
                    else {
                        console.log("browser");
                        store.loadPublishedIdNamePairs();
                    }
                }
            }
        }
        dislikeMap(mapId)
    }

    store.addComment = (comment) => {
        async function asyncAddComment(comment) {
            let diff = {
                newComment: comment
            }
            store.currentMap.comments.push(comment);
            console.log("the diff is ", diff)
            let response = await api.updateMapById(store.currentMap._id, diff);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.PUBLISHED,
                    payload: {
                        map: store.currentMap
                    }
                })
            }
            store.loadIdNamePairs();
        }
        asyncAddComment(comment);
    }

    store.deleteComment = (comment) => {
        async function asyncdeleteComment(comment) {
            let diff = {
                removeComment: comment
            }
            const index = store.currentMap.comments.indexOf(comment);
            store.currentMap.comments.splice(index, 1);
            console.log("the diff is ", diff)
            let response = await api.updateMapById(store.currentMap._id, diff);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.PUBLISHED,
                    payload: {
                        map: store.currentMap
                    }
                })
            }
            store.loadIdNamePairs();
        }
        asyncdeleteComment(comment);
    }

    store.updateMapAttributes = (
        mapColor, 
        borderSwitch, 
        borderWidth, 
        borderColor, 
        regionSwitch, 
        regionNameColor, 
        backgroundColor, 
        center, 
        zoom, 
        radius, 
        dotColor, 
        dotOpacity, 
        regionNameTextSize, 
        selectedValue,
        lowColorChoro,
        highColorChoro,
        levelsChoro,
        legendColors,
        legendValues,
        legendOn,
        legendName,
        regionNameToDisplay,
        ttDirection,
        thumbNail
        ) => {
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
            radius,
            dotColor,
            dotOpacity,
            regionNameTextSize,
            selectedValue,
            lowColorChoro,
            highColorChoro,
            levelsChoro,
            legendColors,
            legendValues,
            legendOn,
            legendName,
            regionNameToDisplay,
            ttDirection,
            thumbNail
          };
        
          // Loop through the updated attributes and store them in store.currentMap.mapFeatures.edits
          for (const key in updatedAttributes) {
            if (Object.prototype.hasOwnProperty.call(updatedAttributes, key)) {
                store.currentMap.mapFeatures.edits[key] = updatedAttributes[key];
            }
        }

        async function asyncUpdateMapAttributes(attributes) {
            let response = await api.updateMapAttributesById(store.currentMap._id, attributes);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.UPDATE_MAP,
                    payload: store.currentMap
                })
            }
        }
        asyncUpdateMapAttributes(store.currentMap.mapFeatures);
    }

    //will be using this for all mapfeature edit transaction stuff
    store.editMapAttributes = function (newMapEdits) {
        let map = JSON.parse(JSON.stringify(store.currentMap));
        map.mapFeatures.edits = newMapEdits;
        //update store
        storeReducer({
            type: GlobalStoreActionType.UPDATE_MAP,
            payload: map
        })
        console.log('store.editMapAttributes')
        //console.log('recieved:' + newMapEdits.mapColor)
        //console.log('set store to' + map.mapFeatures.edits.mapColor)
        //console.log('store is now' + store.currentMap.mapFeatures.edits.mapColor)
    }


    store.publishMap = function (id) {
        async function asyncPublishMap(id) {
            let response = await api.getMapById(id);
            if (response.data.success) {
                let map = { ...response.data.map };
                map.published = true;
                let diff = jsondiffpatch.diff(map, response.data.map)
                async function updateMap(diff) {
                    response = await api.updateMapById(id, diff);
                    if (response.data.success) {
                        response = await api.getMapPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.PUBLISHED,
                                payload: {
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

    // Sort and Search and Filter 
    store.updateSort = (sort) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_SORT,
            payload: sort
        })
    }
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

    store.updateCurrentMapLocally = function (updatedMapData) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_MAP,
            payload: updatedMapData
        })
    }

    //Transaction stack functions
    store.addMapFeaturesEditsTransaction = function (oldEdits, newEdits) {
        console.log('add transaction to stack')//Create transaction and add to stack
        let transaction = new MapFeaturesEdits_Transaction(store, oldEdits, newEdits);
        tps.addTransaction(transaction);

    }

    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canUndo = function () {
        return tps.hasTransactionToUndo();
    }
    store.canRedo = function () {
        return tps.hasTransactionToRedo();
    }
    store.clearTransactionStack = function () {
        tps.clearAllTransactions();
    }
    store.hasAnyTransactions = function () {
        return tps.hasTransactionToUndo() || tps.hasTransactionToRedo();
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