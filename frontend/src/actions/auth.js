import * as api from '../API/index'

export const login = (formData, history) => async (dispatch) => {
    try {
    const {data} = await api.signIn(formData)

        const setLogin = (user) => ({type: 'LOGIN', payload: user})

        history.push('/')
        dispatch(setLogin(data.user))
    } catch (error) {
        console.log(error)
    }
}

export const register = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData)

        const setRegister = (user) => ({type: 'LOGIN', payload: user})

        history.push('/')
        dispatch(setRegister(data.user))
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const {data} = await api.updateUser(id, user);

        dispatch({type: 'UPDATE_USER', payload: data})
    } catch (e) {
        console.log(e.message)
    }
}
