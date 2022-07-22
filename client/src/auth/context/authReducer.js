import { types } from "../../types/types";

export const authReducer = (state = {}, action) => {
    switch (action.type) {

        case types.login:
            return {
                ...state,
                logged: true,
                user: action.payload,
            }

        break;

        case types.logout:
            return {
                logged: false,
                name: null,
            }

        default:
            return state;
        
        break;
    }
}