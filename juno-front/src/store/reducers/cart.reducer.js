import { actionTypes } from '../actions/cart.action'

const initialState = {
    itens: [],
    total: 0,
    count: 0
}

const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { ...state, ...payload }

    default:
        return state
    }
}

export default cartReducer
