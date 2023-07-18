import * as api from "../API";

export const getPubsByAdmin = (page) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data: {data, currentOfPubPage, numberOfPubPages}} = await api.fetchAllPubs(page);

        dispatch({type: 'FETCH_ALL_BY_ADMIN', payload: {data, currentOfPubPage, numberOfPubPages}});
        dispatch({type: 'END_LOADING'})
    } catch (e) {
        console.log(e.message);
    }
}

export const getNotActivatedPubs = () => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data} = await api.fetchNotActivatedPubs();

        dispatch({type: 'FETCH_NOT_ACTIVATED', payload: data});
        dispatch({type: 'END_LOADING'})
    } catch (e) {
        console.log(e.message);
    }
}

export const deletePubByAdmin = (id) => async (dispatch) => {
    try {
        await api.deletePubByAdmin(id)

        const {data} = await api.fetchNotActivatedPubs();

        dispatch({type: 'FETCH_NOT_ACTIVATED', payload: data});

        // dispatch({type: 'DELETE', payload: id})

    } catch (e) {
        console.log(e)
    }
}

export const getUsersByAdmin = (page) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data: {data, currentUserPage, numberOfUserPages}} = await api.fetchAllUsers(page);

        dispatch({type: 'FETCH_ALL_USERS', payload: {data, currentUserPage, numberOfUserPages}});
        dispatch({type: 'END_LOADING'})
    } catch (e) {
        console.log(e.message);
    }
}

export const updateUserByAdmin = (id, user) => async (dispatch) => {
    try {
        const {data} = await api.updateUser(id, user);

        dispatch({type: 'UPDATE_USER', payload: data})
    } catch (e) {
        console.log(e)
    }
}

export const createUserByAdmin = (user) => async (dispatch) => {
    try {
        const {data} = await api.createUser(user);

        dispatch({type: 'CREATE_USER', payload: data})

    } catch (e) {
        console.log(e)
    }
}

export const deleteUserByAdmin = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id)

        dispatch({type: 'DELETE_USER', payload: id})
    } catch (e) {
        console.log(e)
    }
}

export const getUsersBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data: {data}} = await api.fetchUsersBySearch(searchQuery);

        dispatch({type: 'FETCH_BY_SEARCH_USERS', payload: {data}});
        dispatch({type: 'END_LOADING'})

    } catch (e) {
        console.log(e.message);
    }
}
