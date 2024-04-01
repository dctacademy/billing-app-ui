export default function customerReducer (state, action) {
    switch(action.type) {
        case 'SET_CUSTOMERS' : {
            return {...state, data: action.payload }
        }
        default: {
            return {...state }
        }
    }
}