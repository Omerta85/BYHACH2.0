import * as api from '../API'

export const getPub = (id) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data} = await api.fetchPub(id);

        dispatch({type: 'FETCH_PUB', payload: {pub: data}});
        // dispatch({type: 'END_LOADING'})

    } catch (e) {
        console.log(e.message)
    }
}

export const getPubs = (page) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data: {data, currentPage, numberOfPages}} = await api.fetchPubs(page);

        dispatch({type: 'FETCH_ALL', payload: {data, currentPage, numberOfPages}});
        dispatch({type: 'END_LOADING'})
    } catch (e) {
        console.log(e.message);
    }
}

export const getAllPubs = () => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data} = await api.fetchAllPubsByAdmin();

        dispatch({type: 'FETCH_PUBS', payload: data});
        dispatch({type: 'END_LOADING'})
    } catch (e) {
        console.log(e.message);
    }
}

export const getAllSortedPubs = (query) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data} = await api.fetchAllSortedPubs(query);

        dispatch({type: 'FETCH_PUBS', payload: data});
        dispatch({type: 'END_LOADING'})
    } catch (e) {
        console.log(e.message);
    }
}

export const activatePub = (id) => async (dispatch) => {
    try {
        const {data} = await api.activatePub(id)
        console.log(data)

        dispatch({type: 'ACTIVATE', payload: data})

    } catch (e) {
        console.log(e)
    }
}

export const createPub = (formData) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})

        const {data} = await api.createPub(formData);
        console.log(data)

        dispatch({type: 'CREATE', payload: data});

    } catch (e) {
        console.log(e.message)
    }
}

export const updatePub = (id, pub) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})

        const {data} = await api.updatePub(id, pub);
        console.log(data)

        // dispatch({type: 'UPDATE', payload: {data: data}})
        dispatch({type: 'FETCH_PUBS', payload: data});

        dispatch({type: 'END_LOADING'})

    } catch (e) {
        console.log(e.message)
    }
}

export const deletePub = (pub_id, page) => async (dispatch) => {
    try {
        const {data} = await api.deletePub(pub_id, page)

        dispatch({type: 'FETCH_PUBS', payload: data});

    } catch (e) {
        console.log(e)
    }
}

export const newReview = (rating, comment, pub_id, user_id, user_name) => async (dispatch) => {
    try {
        const {data}  = await api.newReview(rating, comment, pub_id, user_id, user_name)

        dispatch({
            type: 'FETCH_REVIEWS',
            payload: data,
        });
    } catch (e) {
        console.log(e)
    }
};

export const getAllReviews = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAllReviews(id)

        dispatch({
            type: 'FETCH_REVIEWS',
            payload: data,
        });
    } catch (error) {
        console.log(error)
    }
};

export const deleteReviews = (pubId, reviewId) => async (dispatch) => {
    try {
        const { data } = await api.deleteReviews(pubId, reviewId)

        dispatch({type: 'FETCH_REVIEWS', payload: data});
    } catch (error) {
        console.log(error)
    }
};

export const newNews = (formData, pub_id, user_id) => async (dispatch) => {
    try {
        const {data}  = await api.newNews(formData, pub_id, user_id)

        dispatch({type: 'FETCH_NEWS', payload: data});
    } catch (e) {
        console.log(e)
    }
};

export const getAllNews = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAllNews(id)

        dispatch({type: 'FETCH_NEWS', payload: data});
    } catch (error) {
        console.log(error)
    }
};

export const deleteNews = (pubId, newsId) => async (dispatch) => {
    try {
        const { data } = await api.deleteNews(pubId, newsId)

        dispatch({type: 'FETCH_NEWS', payload: data});
    } catch (error) {
        console.log(error)
    }
};

