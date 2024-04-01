export default function customerReducer (state, action) {
    switch(action.type) {
        case 'SET_CUSTOMERS' : {
            return {...state, data: action.payload }
        }
        case 'ADD_CUSTOMER' : {
            return {...state, data: [...state.data, action.payload ]}
        }
        case 'SET_ERRORS' : {
            return {...state, serverErrors: action.payload}
        }
        case 'REMOVE_CUSTOMER' : {
            return {...state, data: state.data.filter(ele => ele._id != action.payload._id)}
        }
        default: {
            return {...state }
        }
    }
}