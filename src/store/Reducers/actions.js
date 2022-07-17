import API from '../../apiUsers';
import { REQUEST_HOME_FIRST_SECTION_DATA, 
    RECEIVE_HOME_FIRST_SECTION_DATA, 
    REQUEST_HOME_FIRST_SECTION_ERROR,
    REQUEST_HOME_SECEND_SECTION_DATA,
    RECEIVE_HOME_SECEND_SECTION_DATA,
    REQUEST_HOME_SECEND_SECTION_ERROR,
    REQUEST_GET_OFFER_DATA,
    RECEIVE_GET_OFFER_DATA,
    REQUEST_GET_OFFER_ERROR, 
    REQUEST_GET_DESTINATION_DATA, 
    RECEIVE_GET_DESTINATION_DATA, 
    REQUEST_GET_DESTINATION_ERROR, 
    REQUEST_GET_SIDER_DATA, 
    RECEIVE_GET_SIDER_DATA, 
    REQUEST_GET_SIDER_ERROR,
    REQUEST_SEARCH_DATA,
    RECEIVE_SEARCH_DATA,
    REQUEST_SEARCH_ERROR,
    REQUEST_LOGO_URL,
    RECEIVE_LOGO_URL,
    REQUEST_LOGO_URL_ERROR } from '../constant'

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

export function requestOfferToShowData() {
    return {
        type: REQUEST_HOME_SECEND_SECTION_DATA,
    };
}

export function receiveOfferToShowData(json){
    return {
        type: RECEIVE_HOME_SECEND_SECTION_DATA,
        data: json.data
    }
}

function receiveOfferToShowError(error){
    return {
        type: REQUEST_HOME_SECEND_SECTION_ERROR,
        data: error
    }
}

export function fetchOfferToShowData() {
    return dispatch => {
        dispatch(requestOfferToShowData());
        return API.get('/getOffer')
            .then(res => res)
            .then(json => dispatch(receiveOfferToShowData(json)))
            .catch(err => dispatch(receiveOfferToShowError(err)));
    };
}

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

export function requestDestinationData() {
    return {
        type: REQUEST_GET_DESTINATION_DATA,
    };
}

export function receiveDestinationData(json){
    return {
        type: RECEIVE_GET_DESTINATION_DATA,
        data: json.data
    }
}

function receiveDestinationError(error){
    return {
        type: REQUEST_GET_DESTINATION_ERROR,
        data: error
    }
}

export function fetchDestinationData(id_destination) {
    return dispatch => {
        dispatch(requestDestinationData());
        return API.get(`/getDestination/${id_destination}`)
            .then(res => res)
            .then(json => dispatch(receiveDestinationData(json)))
            .catch(err => dispatch(receiveDestinationError(err)));
    };
}

/*
REQUEST_GET_SIDER_DATA, 
    RECEIVE_GET_SIDER_DATA, 
    REQUEST_GET_SIDER_ERROR

*/

export function requestSliderData() {
    return {
        type: REQUEST_GET_SIDER_DATA,
    };
}

export function receiveSliderData(json){
    return {
        type: RECEIVE_GET_SIDER_DATA,
        data: json.data
    }
}

function receiveSliderError(error){
    return {
        type: REQUEST_GET_SIDER_ERROR,
        data: error
    }
}

export function fetchSliderData() {
    return dispatch => {
        dispatch(requestSliderData());
        return API.get('/sliderOffer')
            .then(res => res)
            .then(json => dispatch(receiveSliderData(json)))
            .catch(err => dispatch(receiveSliderError(err)));
    };
}

/*

REQUEST_SEARCH_DATA,
RECEIVE_SEARCH_DATA,
REQUEST_SEARCH_ERROR

*/

export function requestSearchData() {
    return {
        type: REQUEST_SEARCH_DATA,
    };
}

export function receiveSearchData(json){
    return {
        type: RECEIVE_SEARCH_DATA,
        data: json.data
    }
}

function receiveSearchError(error){
    return {
        type: REQUEST_SEARCH_ERROR,
        data: error
    }
}

export function fetchSearchData(id_destination = null, id_type = null, month = null, page = 1) {
    return dispatch => {
        dispatch(requestSearchData());
        return API.get('/searchOffer', {
            params: {
                id_destination: id_destination,
                id_type: id_type,
                page: page
            }
        })
            .then(res => res)
            .then(json => dispatch(receiveSearchData(json)))
            .catch(err => dispatch(receiveSearchError(err)));
    };
}


/*

REQUEST_LOGO_URL,
RECEIVE_LOGO_URL,
REQUEST_LOGO_URL_ERROR

*/

export function requestLogoUrl() {
    return {
        type: REQUEST_LOGO_URL,
    };
}

export function receiveLogoUrl(json){
    return {
        type: RECEIVE_LOGO_URL,
        data: json.data
    }
}

function receiveLogoUrlError(error){
    return {
        type: REQUEST_LOGO_URL_ERROR,
        data: error
    }
}

export function fetchLogoUrl() {
    return dispatch => {
        console.log("start logo")
        dispatch(requestLogoUrl());
        console.log("End logo")
        return API.get('/getLogo')
            .then(res => res)
            .then(json => dispatch(receiveLogoUrl(json)))
            .catch(err => dispatch(receiveLogoUrlError(err)));
    };
}