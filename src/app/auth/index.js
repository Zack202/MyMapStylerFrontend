import React, { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import api from './auth-request-api'
//changed auth

export const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);



// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    REGISTER_USER_ERROR: "REGISTER_USER_ERROR",
    UPDATE_USER_INFO: "UPDATE_USER_INFO"
}

function AuthContextProvider(props) {
    const router = useRouter()

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
            case AuthActionType.UPDATE_USER_INFO: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorFound: ""
                })
            }
            case AuthActionType.UPDATE_INFO_ERROR: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
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
        if (response.status === 201) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            console.log("successfully registered user")
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

    auth.loginUser = async function(email, password) {
        console.log("Logging in...", email, password)
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
            router.push("/");
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

    auth.resetPassword = async function(token, password, passwordConfirm) {
        try{
            console.log("Resetting password...", token, password, passwordConfirm)
            const response = await api.resetPassword(token, password, passwordConfirm);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                console.log("succesfully reset password")
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

    auth.forgotPassword = async function(email) {
        try{
            console.log("Forgot password...", email)
            const response = await api.forgotPassword(email);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER_ERROR,
                    payload: {
                        errorMessage: "Please check your email for a reset link"
                    }
                })
                console.log("succesfully reset password")
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

    auth.updateUserInfo = async function(id, firstName, lastName){
        try{
            console.log("this is")
            console.log(firstName)
            const response = await api.updateUserInfo(id, firstName, lastName);
            if(response.status === 200){
                authReducer({
                    type: AuthActionType.UPDATE_USER_INFO,
                    payload: {
                        user: response.data.user
                    }
                })
                console.log("succesfully updated info")
            }
        }catch(error){
            authReducer({
                type: AuthActionType.UPDATE_INFO_ERROR,
                payload: {
                    errorMessage: error.response.data.errorMessage
                }
            })
        }
    }

    auth.deleteUser = async function() {
        console.log("Deleting user...")
        const response = await api.deleteUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            router.push("/");
        }
    }

    // //update user info
    // auth.updateUserInfo = async function(data){
    //     const response = await api.updateUserInfo(data);
    //     console.log("the response was" + response)
    //     if(response.status == 200){
    //         console.log("it worked")
    //         router.refresh()
    //     } else {
    //         console.log("it didnt workkk")
    //     }
    // }

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