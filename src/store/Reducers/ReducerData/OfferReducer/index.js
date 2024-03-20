import { combineReducers } from 'redux'
import { 
    REQUEST_GET_OFFER_DATA,
    RECEIVE_GET_OFFER_DATA,
    REQUEST_GET_OFFER_ERROR } from '../../../constant'

export function offerReducersData(
    state = {
        isFetchingOfferSelect: true,
        offerSelected: {}
    },
    action
){
    switch(action.type){
        case REQUEST_GET_OFFER_DATA:
        return Object.assign({}, state, {
            isFetchingOfferSelect: true,
            offerSelected: null
        });
        case RECEIVE_GET_OFFER_DATA:
            return Object.assign({}, state, {
                isFetchingOfferSelect: false,
                offerSelected: action.data,
            });
        case REQUEST_GET_OFFER_ERROR:
            return Object.assign({}, state, {
                isFetchingOfferSelect: false,
                offerSelected: action.error,
            });
        default:
            return state;
    }
}


const offerReducer = combineReducers({
    offerReducersData
});

export default offerReducer;