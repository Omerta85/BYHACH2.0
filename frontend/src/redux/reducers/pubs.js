export default (state = {isLoading: true, pubs: [], reviews: [], news: []}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return {...state, isLoading: true}
        case 'END_LOADING':
            return {...state, isLoading: false}
        case 'FETCH_NOT_ACTIVATED':
            return {...state, pubs: action.payload};
        case 'FETCH_PUBS':
            return {...state, pubs: action.payload};
        case 'FETCH_PUB':
            return {...state, pub: action.payload.pub};
        case 'FETCH_BY_SEARCH':
            return {...state, pubs: action.payload};
        case 'FETCH_REVIEWS':
            return {...state, reviews: action.payload};
        case 'FETCH_NEWS':
            return {...state, news: action.payload};
        case 'DELETE':
            return {...state, pubs: state.pubs.data.filter((pub) => pub._id !== action.payload)};
        case 'CREATE':
            console.log(state)
            return {...state, pubs: [...state.pubs.data, action.payload]};
        // case 'UPDATE':
        //     console.log(state.pubs)
        //     return {...state, pubs: state.pubs.data.map((pub) => (pub._id === action.payload.data._id ? action.payload.data : pub))}
        case 'ACTIVATE':
            return {...state, pubs: state.pubs.data.map((pub) => (pub._id === action.payload._id ? action.payload : pub))}
        default:
            return state
    }
}
