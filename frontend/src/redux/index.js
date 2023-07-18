import {applyMiddleware, compose, createStore} from 'redux'
import {rootReducer} from "./reducers";
import thunk from 'redux-thunk';

let initialState = {
    cart:{
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
}

export const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk)))
