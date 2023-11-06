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

export const createNewName = (name) => api.post(`/name/${name}`)
export const getNames = () => api.get(`/names`)


const apis = {
    createNewName,
    getNames
}

export default apis