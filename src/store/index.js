import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk';
import rootReducer from './Reducers'

const store = createStore(
    combineReducers({
        rootReducer
    }),
    applyMiddleware(thunkMiddleware)
)

export default store;