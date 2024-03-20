import API from "../../../../apiUsers.js";
import { 
    REQUEST_GET_OFFER_DATA,
    RECEIVE_GET_OFFER_DATA,
    REQUEST_GET_OFFER_ERROR } from '../../../constant'

export function requestOfferSelectedData() {
    return {
        type: REQUEST_GET_OFFER_DATA,
    };
}

export function receiveOfferSelectedData(json){
    return {
        type: RECEIVE_GET_OFFER_DATA,
        data: json.data
    }
}

function receiveOfferSelectedError(error){
    return {
        type: REQUEST_GET_OFFER_ERROR,
        data: error
    }
}

export function fetchOfferSelectedData(offerId) {
    return dispatch => {
        dispatch(requestOfferSelectedData());
        return API.get(`/getOfferById/${offerId}`)
            .then(res => res)
            .then(json => dispatch(receiveOfferSelectedData(json)))
            .catch(err => dispatch(receiveOfferSelectedError(err)));
    };
}