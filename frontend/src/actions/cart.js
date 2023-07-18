import * as api from "../API";

export const addToCart = (user_id, pub_id) => async (dispatch) => {
    try {
        const { data } = await api.addToCart(user_id, pub_id)

        dispatch({type: 'ADD_CART', payload: data});

    } catch (error) {
        console.log(error)
    }
};


export const removeItemFromCart = (user_id, pub_id) => async (dispatch) => {
    try {
        const {data} = await api.removeFromCart(user_id, pub_id)

        dispatch({type: 'FETCH_USER', payload: {user: data}})

    } catch (error) {
        console.log(error)
    }
};
