const users = {
    authData: null,
    isAuth: false
}


const authReducer = (state=users, action) => {
    switch (action?.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData: action?.data, isAuth: true};
        case 'LOGIN':
            localStorage.setItem('profile', JSON.stringify({...action?.payload}))
            return {...state, authData: action?.payload, isAuth: true}
        case 'LOGOUT':
            localStorage.clear();
            return {...state, authData: null}
        default:
            return state
    }
}

export default authReducer
