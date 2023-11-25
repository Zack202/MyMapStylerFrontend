import React, { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import api from './auth-request-api'

export const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    REGISTER_USER_ERROR: "REGISTER_USER_ERROR"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorFound: ""
    });

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorFound: ""
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorFound: ""
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorFound: ""
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: false,
                    errorFound: ""
                })
            }
            case AuthActionType.REGISTER_USER_ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorFound: payload.errorMessage
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(userName, firstName, lastName, email, password, confirmPassword) {
        try{
        console.log(
            'Registering user...',
            userName,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
          );
        const response = await api.registerUser(userName, firstName, lastName, email, password, confirmPassword)
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            //router.push("/login");
        }
    } catch(error) { 
        authReducer({
            type: AuthActionType.REGISTER_USER_ERROR,
            payload: {
                errorMessage: error.response.data.errorMessage
            }
        })
    }
    }

    auth.loginUser = async function(email, password) {
        console.log(email, password)
        try{
        const response = await api.loginUser(email, password);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            console.log(response.data.user)
            router.push("/home_browser");
        }
    } catch(error) { 
        authReducer({
            type: AuthActionType.REGISTER_USER_ERROR,
            payload: {
                errorMessage: error.response.data.errorMessage
            }
        })
    }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            //router.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }
    auth.unErrorFound = async function (){
        authReducer({
            type: AuthActionType.LOGOUT_USER,
            payload: {}
            }
        );
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };