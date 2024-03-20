import API from "../../../apiUsers.js";

import { REQUEST_HOME_FIRST_SECTION_DATA, 
    RECEIVE_HOME_FIRST_SECTION_DATA, 
    REQUEST_HOME_FIRST_SECTION_ERROR } from "../../constant.js"

export function requestOfferData() {
    return {
        type: REQUEST_HOME_FIRST_SECTION_DATA,
    };
}

export function receiveOfferData(json){
    return {
        type: RECEIVE_HOME_FIRST_SECTION_DATA,
        data: json.data
    }
}

function receiveOfferError(error){
    return {
        type: REQUEST_HOME_FIRST_SECTION_ERROR,
        data: error
    }
}

export function fetchOfferData() {
    return dispatch => {
        dispatch(requestOfferData());
        return API.get('/getHomeData')
            .then(res => res)
            .then(json => dispatch(receiveOfferData(json)))
            .catch(err => dispatch(receiveOfferError(err)));
    };
}