import * as api from "../API";

export const addToOffer = (user_id, formData) => async (dispatch) => {
    try {
        const { data } = await api.addToOffer(user_id, formData)

        dispatch({type: 'ADD_OFFER', payload: data});

    } catch (error) {
        console.log(error)
    }
};


export const removeItemFromOffer = (user_id, item_id) => async (dispatch) => {
    try {
        const data = await api.removeFromOffer(user_id, item_id)

        dispatch({type: 'FETCH_USERS', payload: data.data})
    } catch (error) {
        console.log(error)
    }
};
