const cartReducer = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const item = action.payload

            const isItemExist = state.cartItems.find(
                (i) => i._id === item._id);

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i === isItemExist ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case 'FETCH_CART_ITEM':
            return {...state, cartItems: action.payload};

        // case 'REMOVE_CART_ITEM':
        //     return {
        //         ...state,
        //         cartItems: state.cartItems.filter((i) => {
        //             return i._id !== action.payload
        //         }),
        //     };
        default:
            return state
    }
}

export default cartReducer
