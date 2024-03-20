import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk';
import rootReducer from './Reducers';
import destinationReducer from './Reducers/ReducerData/DestinationReducer';
import HomeReducer from './Reducers/ReducerData/HomeReducer.js';
import offerReducer from './Reducers/ReducerData/OfferReducer/index.js';

const store = createStore(
    combineReducers({
        rootReducer: rootReducer,
        HomeReducer: HomeReducer,
        offerReducer: offerReducer,
        destinationReducer: destinationReducer
    }),
    applyMiddleware(thunkMiddleware)
)

export default store;