import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import productsReducer from '../reducers/products-reducer'
import invoicesReducer from '../reducers/invoices-reducer'
const configureStore = () => {
    const store = createStore(combineReducers({
        products: productsReducer, 
        invoices: invoicesReducer
    }), applyMiddleware(thunk))
    return store 
}

export default configureStore