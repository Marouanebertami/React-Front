import { combineReducers } from 'redux'
import { REQUEST_HOME_FIRST_SECTION_DATA, 
        RECEIVE_HOME_FIRST_SECTION_DATA, 
        REQUEST_HOME_FIRST_SECTION_ERROR } from '../../constant.js'

export function HomeData(
    state = {
        isFetchingPerfectOffer: true,
        perfectOffer: {}
    },
    action
) {
    switch (action.type) {
        // first data
        case REQUEST_HOME_FIRST_SECTION_DATA:
            return Object.assign({}, state, {
                isFetchingPerfectOffer: true,
                perfectOffer: null
            });
        case RECEIVE_HOME_FIRST_SECTION_DATA:
            return Object.assign({}, state, {
                isFetchingPerfectOffer: false,
                perfectOffer: action.data,
            });
        case REQUEST_HOME_FIRST_SECTION_ERROR:
            return Object.assign({}, state, {
                isFetchingPerfectOffer: false,
                perfectOffer: action.error,
            });

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    reducersData
});

export default rootReducer;