const initialState = {
    data: []
}

export default function invoicesReducer(state = initialState, action) {
    switch(action.type){
        case 'SET_INVOICES' : {
            return {...state, data: action.payload }
        }
        default: {
            return {...state}
        }
    }
}