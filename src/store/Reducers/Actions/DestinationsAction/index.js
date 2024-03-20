import API from "../../../../apiUsers.js";
import { 
    REQUEST_GET_DESTINATION_HOME_DATA,
    RECEIVE_GET_DESTINATION_HOME_DATA,
    REQUEST_GET_DESTINATION_HOME_ERROR } from '../../../constant'

export function requestDestinationSelectedData() {
    return {
        type: REQUEST_GET_DESTINATION_HOME_DATA,
    };
}

export function receiveDestinationSelectedData(json){
    return {
        type: RECEIVE_GET_DESTINATION_HOME_DATA,
        data: json.data
    }
}

function receiveDestinationSelectedError(error){
    return {
        type: REQUEST_GET_DESTINATION_HOME_ERROR,
        data: error
    }
}

export function fetchDestinationSelectedData(offerId) {
    return dispatch => {
        dispatch(requestDestinationSelectedData());
        return API.get(`/getdestinations`)
            .then(res => res)
            .then(json => dispatch(receiveDestinationSelectedData(json)))
            .catch(err => dispatch(receiveDestinationSelectedError(err)));
    };
}