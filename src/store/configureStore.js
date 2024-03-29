import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import productsReducer from '../reducers/products-reducer'
const configureStore = () => {
    const store = createStore(combineReducers({
        products: productsReducer
    }), applyMiddleware(thunk))
    return store 
}

export default configureStore