import axios from 'axios';

axios.defaults.withCredentials = true;

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:4000/auth';
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://my-map-styler-backend-79df2eb36474.herokuapp.com/auth';
}

const api = axios.create({
  baseURL,
});


export const getLoggedIn = () => api.get(`/loggedIn/`);
export const loginUser = (email, password) => {
    return api.post(`/login/`, {
        email : email,
        password : password
    })
}
export const logoutUser = () => api.get(`/logout/`)
export const registerUser = (userName, firstName, lastName, email, password, confirmPassword) => {
    return api.post(`/register/`, {
        userName : userName,
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : password,
        confirmPassword : confirmPassword
    })
}
export const resetPassword = (token, password, passwordConfirm) => {
    return api.patch(`/resetPassword/${token}`, {
        password : password,
        passwordConfirm : passwordConfirm
    })
}

export const forgotPassword = (email) => {
    return api.post(`/forgotPassword/`, {
        email : email
    })
}

export const deleteUser = () => api.get(`/deleteUser/`)
export const updateUserInfo = (data) => api.put('/profile', { data: data })

const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    forgotPassword,
    deleteUser,
    updateUserInfo
}

export default apis