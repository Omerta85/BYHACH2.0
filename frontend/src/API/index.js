import axios from 'axios';

const API = axios.create({baseURL: process.env.REACT_APP_BASEURL})

export const fetchPub = (id) => API.get(`/pubs/${id}`)
export const addToCart = (user_id, pub_id) => API.post(`/users/cart`, {user_id, pub_id})
export const removeFromCart = (user_id, pub_id) => API.delete(`/users/cart/remove/${user_id}/${pub_id}`)
export const fetchPubs = (page) => API.get(`/pubs?page=${page}`)
export const fetchAllPubsByAdmin = () => API.get('/admin/pubs/all')

export const fetchAllSortedPubs = (query) => API.get(`/pubs${query}&isActivated=true`)

export const addToOffer = (user_id, formData) => API.post(`/users/offer/${user_id}`, formData)
export const removeFromOffer = (user_id, item_id) => API.delete(`/users/offer/remove/${user_id}/${item_id}`)

export const fetchNotActivatedPubs = () => API.get(`/admin/pubs/filter`)
export const fetchAllPubs = (page) => API.get(`/admin/pubs?page=${page}`)
export const createPub = (formData) => API.post('/pubs', formData);
export const updatePub = (id, updatedPub) => API.patch(`/pubs/${id}?isActivated=true`, updatedPub);
export const news = (value, id) => API.post(`/pubs/${id}/newsPub`, {value});
export const deletePub = (pub_id, page) => API.delete(`/pubs/${pub_id}?page=${page}&isActivated=true`);
export const deletePubByAdmin = (pub_id) => API.delete(`/pubs/${pub_id}`);
export const activatePub = (id) => API.patch(`/admin/activate/${id}`);

export const newReview = (rating, comment, pub_id, user_id, user_name) => API.post('/pubs/reviews', {rating, comment, pub_id, user_id, user_name})
export const getAllReviews = (id) => API.get(`/pubs/reviews/${id}`)
export const deleteReviews = (id, reviewId) => API.delete(`/pubs/reviews/${id}/${reviewId}`)

export const newNews = (formData, pub_id, user_id) => API.post(`/pubs/news/${pub_id}/${user_id}`, formData)
export const getAllNews = (id) => API.get(`/pubs/news/${id}`)
export const deleteNews = (id, newsId) => API.delete(`/pubs/news/${id}/${newsId}`)

export const fetchUser = (user_id) => API.get(`/users/${user_id}`)
export const fetchAllUsers = (page) => API.get(`/admin/users?page=${page}`)
export const fetchUsers = () => API.get('/users')
export const fetchUsersBySearch = (searchQuery) => API.get(`/admin/users/search?searchQuery=${searchQuery.search || 'none'}`);
export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);
export const createUser = (newUser) => API.post('/users', newUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);

