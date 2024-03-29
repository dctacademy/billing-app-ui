const initialState = {
    data: [],
    serverErrors: []
}

const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_PRODUCTS' : {
            return {...state, data: action.payload}
        }
        case 'ADD_PRODUCT' : {
            return {...state, data: [...state.data, action.payload ]}
        }
        case 'SET_ERRORS' : {
            return {...state, serverErrors: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}

export default productsReducer