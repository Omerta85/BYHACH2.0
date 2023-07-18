const offerReducer = (state = {offerItems: []}, action) => {
    switch (action.type) {
        case 'ADD_TO_OFFER':
            const item = action.payload

            const isItemExist = state.offerItems.find(
                (i) => i._id === item._id);

            if (isItemExist) {
                return {
                    ...state,
                    offerItems: state.offerItems.map((i) =>
                        i === isItemExist ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    offerItems: [...state.offerItems, item],
                }
            }

        case 'REMOVE_OFFER_ITEM':
            return {
                ...state,
                offerItems: state.offerItems.filter((i) => {
                    return i._id !== action.payload
                }),
            };
        default:
            return state
    }
}

export default offerReducer
