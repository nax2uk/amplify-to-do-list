import React, { useReducer, useCallback } from 'react';
import { Auth } from 'aws-amplify';
import UserContext from './userContext';
import userReducer from './userReducer';

import {
    GET_USER,
    SET_USER,
    SET_LOADING,
    GET_ATTR,
    SET_ATTR,
    LOGOUT_ERROR,
    ERROR_UPDATE_EMAIL,
    RESET_ERROR,
    ERROR_VERIFICATION_CODE

}
    from '../types';

const UserState = props => {
    const initialState = {
        isLoading: true,
        user: null,
        userAttr: null,
        error: null,
    }

    const [state, dispatch] = useReducer(userReducer, initialState);
    const setLoading = (loading) => {
        dispatch({
            type: SET_LOADING,
            payload: {
                loading,
            }
        })
    }

    const setUser = (user) => {
        dispatch({
            type: SET_USER,
            payload: {
                user,
            }
        })
    }
    const getUserData = useCallback(() => {
        const retrieveData = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                dispatch({
                    type: GET_USER,
                    payload: {
                        user,
                    }
                })
            } catch (error) {
                // user not authenticated but don't need to return error
                dispatch({
                    type: SET_LOADING,
                    payload: {
                        loading: false,
                    }
                })
            }
        }
        retrieveData();

    }, []);

    const getUserAttr = useCallback(() => {
        if (state.user !== null) {
            Auth.userAttributes(state.user)
                .then(attrArr => {
                    const attrObj = Auth.attributesToObject(attrArr);
                    dispatch({
                        type: GET_ATTR,
                        payload: {
                            attrObj,
                        }
                    })
                })
        }
    }, [state.user]);

    const updateEmail = async (email) => {
        try {
            const updatedAttr = {
                email,
            }
            const result = await Auth.updateUserAttributes(state.user, updatedAttr);

            if (result === "SUCCESS") {
                sendVerificationCode('email');
            }
        } catch (error) {
            dispatch({
                type: ERROR_UPDATE_EMAIL,
                payload: {
                    error,
                }
            });
        }
    }

    const sendVerificationCode = async attr => {
        await Auth.verifyCurrentUserAttribute(attr);
    };


    const checkVerificationCode = (verificationCode) => {
        Auth.verifyCurrentUserAttributeSubmit(
            'email',
            verificationCode
        )
            .then(result => {
                if (result === "SUCCESS") {
                    getUserAttr();
                }

            })
            .catch(error => {
                dispatch({
                    type: ERROR_VERIFICATION_CODE,
                    payload: {
                        error,
                    }
                })
            });
    };


    const signOut = async () => {
        try {
            await Auth.signOut()
        } catch (error) {
            dispatch({
                type: LOGOUT_ERROR,
            })
        }
    }
    const resetError = useCallback(() => {

        dispatch({
            type: RESET_ERROR,

        })
    }, []);

    return (
        <UserContext.Provider
            value={{
                user: state.user,
                userAttr: state.userAttr,
                error: state.error,
                isLoading: state.isLoading,
                setUser,
                getUserData,
                getUserAttr,
                updateEmail,
                resetError,
                checkVerificationCode,
                setLoading,
                signOut,

            }}
        >
            {props.children}
        </UserContext.Provider >
    );
}

export default UserState;

