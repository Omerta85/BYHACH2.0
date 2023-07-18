import * as api from "../API";

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data} = await api.fetchUsers();

        dispatch({type: 'FETCH_USERS', payload: data});
        dispatch({type: 'END_LOADING'})
    } catch (e) {
        console.log(e);
    }
}

export const getUser = (id) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data} = await api.fetchUser(id);

        dispatch({type: 'FETCH_USER', payload: {user: data}});

    } catch (e) {
        console.log(e.message)
    }
}
