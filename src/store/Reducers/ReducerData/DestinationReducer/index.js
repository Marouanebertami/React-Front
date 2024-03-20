import { combineReducers } from 'redux'
import { 
    REQUEST_GET_DESTINATION_HOME_DATA,
    RECEIVE_GET_DESTINATION_HOME_DATA,
    REQUEST_GET_DESTINATION_HOME_ERROR } from '../../../constant'

export function destinationReducersData(
    state = {
        isFetchingDestination: true,
        destinationSelected: {}
    },
    action
){
    switch(action.type){
        case REQUEST_GET_DESTINATION_HOME_DATA:
        return Object.assign({}, state, {
            isFetchingDestination: true,
            destinationSelected: null
        });
        case RECEIVE_GET_DESTINATION_HOME_DATA:
            return Object.assign({}, state, {
                isFetchingDestination: false,
                destinationSelected: action.data,
            });
        case REQUEST_GET_DESTINATION_HOME_ERROR:
            return Object.assign({}, state, {
                isFetchingDestination: false,
                destinationSelected: action.error,
            });
        default:
            return state;
    }
}


const destinationReducer = combineReducers({
    destinationReducersData
});

export default destinationReducer;