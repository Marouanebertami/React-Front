import { combineReducers } from 'redux'
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

export function reducersData(
    state = {
        isFetchingPerfectOffer: true,
        isFetchingOffersToShow: true,
        isFetchingOfferSelect: true,
        perfectOffer: {},
        offersToShow: {},
        offerSelected: {},
        isFetchingDestinationById : true,
        destinationById : {},
        isFetchingSliders: true,
        sliders: {},
        isFetchingSearch: true,
        search: {},
        isFetchingLogo: true,
        logoUrl: null
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
            
        // Secend Data
        case REQUEST_HOME_SECEND_SECTION_DATA:
            return Object.assign({}, state, {
                isFetchingOffersToShow: true,
                offersToShow: null
            });
        case RECEIVE_HOME_SECEND_SECTION_DATA:
            return Object.assign({}, state, {
                isFetchingOffersToShow: false,
                offersToShow: action.data,
            });
        case REQUEST_HOME_SECEND_SECTION_ERROR:
            return Object.assign({}, state, {
                isFetchingOffersToShow: false,
                offersToShow: action.error,
            });

        // Select Offer
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

        // Destination By Id data
        case REQUEST_GET_DESTINATION_DATA:
            return Object.assign({}, state, {
                isFetchingDestinationById: true,
                destinationById: null
            });
        case RECEIVE_GET_DESTINATION_DATA:
            return Object.assign({}, state, {
                isFetchingDestinationById: false,
                destinationById: action.data,
            });
        case REQUEST_GET_DESTINATION_ERROR:
            return Object.assign({}, state, {
                isFetchingDestinationById: false,
                destinationById: action.error,
            });

        //Slider Data
        case REQUEST_GET_SIDER_DATA:
            return Object.assign({}, state, {
                isFetchingSliders: true,
                sliders: null
            });
        case RECEIVE_GET_SIDER_DATA:
            return Object.assign({}, state, {
                isFetchingSliders: false,
                sliders: action.data,
            });
        case REQUEST_GET_SIDER_ERROR:
            return Object.assign({}, state, {
                isFetchingSliders: false,
                sliders: action.error,
            });

        //Search Data
        case REQUEST_SEARCH_DATA:
            return Object.assign({}, state, {
                isFetchingSearch: true,
                search: null
            });
        case RECEIVE_SEARCH_DATA:
            return Object.assign({}, state, {
                isFetchingSearch: false,
                search: action.data,
            });
        case REQUEST_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetchingSearch: false,
                search: action.error,
            });

        //Logo Url Data
        case REQUEST_LOGO_URL:
            return Object.assign({}, state, {
                isFetchingLogo: true,
                logoUrl: null
            });
        case RECEIVE_LOGO_URL:
            return Object.assign({}, state, {
                isFetchingLogo: false,
                logoUrl: action.data,
            });
        case REQUEST_LOGO_URL_ERROR:
            return Object.assign({}, state, {
                isFetchingLogo: false,
                logoUrl: action.error,
            });

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    reducersData
});

export default rootReducer;