import { GET_USER, SET_USER, SET_LOADING, GET_ATTR, LOGOUT_ERROR, ERROR_UPDATE_EMAIL, RESET_ERROR, ERROR_VERIFICATION_CODE } from '../types';

const userReducer = (state, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload.user ? action.payload.user : null,
                isLoading: false,
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload.user,
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload.loading,
            }
        case LOGOUT_ERROR:
            return {
                ...state,
                error: "There was an error signing in."
            }
        case GET_ATTR:
            return {
                ...state,
                userAttr: action.payload.attrObj,
            }
        case ERROR_UPDATE_EMAIL:
            return {
                ...state,
                error: action.payload.error || "Error updating Email",
            }
        case RESET_ERROR:
            return {
                ...state,
                error: null,
            }
        case ERROR_VERIFICATION_CODE:
            return {
                ...state,
                error: action.payload.error || "Validation Code is incorrect.",
            }
        default: return state;
    }
}
export default userReducer;