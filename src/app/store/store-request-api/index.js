import axios from 'axios';

axios.defaults.withCredentials = true;

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:4000/api';
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://my-map-styler-backend-79df2eb36474.herokuapp.com/api';
}

const api = axios.create({
  baseURL,
});

export const createNewMap = (name, userName, ownerEmail, mapData, mapType, mapDesc) => {
    return api.post('/createNewMap',{
        //body
        name: name,//{ type: String, required: true },
        description: mapDesc, //{type: String, required: true}
        userName: userName, //{type:String,required: true},
        ownerEmail: ownerEmail,//{ type: String, required: true },
        likes: [], //{type:[String], required: false},
        dislikes: [],//{type:[String], required: false},
        views: 0,//{type: Number, required: false},
        date: 0,//{type: Date, required: false},
        published: false, //{type: Boolean, required: true},
        mapGeometry: mapData, //{type: Object, required: true},
        mapFeatures: null, //{type: Object, required: true},
        mapZoom: 0,//{type: Number, required: false},
        mapCenter: [],//{type: [Number], required: false},
        previousCreators: [],//{ type: [String], required: false},
        mapType: mapType//{type: Number, required: true},


    })
}

export const getMapById = (id) => api.get(`/map/${id}`)
export const updateMapById = (id, diff) => {
  return api.put(`/updateMap/${id}`, {
      // SPECIFY THE PAYLOAD
      diff : diff
  })
}
export const getMapPairs = () => api.get(`/mapPairs/`)
export const deleteMap = (id) => api.get(`/deleteMap/${id}`)



const apis = {
    createNewMap,
    getMapById,
    updateMapById,
    getMapPairs,
    deleteMap
}

export default apis