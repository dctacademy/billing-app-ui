import axios from 'axios'
export const startGetProducts = () => { 
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3050/api/products')
            dispatch(setProducts(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const setProducts = (data) => {
    return { 
        type: 'SET_PRODUCTS', payload: data 
    }
}

export const startCreateProduct = (formData, resetForm) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3050/api/products', formData)
            dispatch(addProduct(response.data))
            dispatch(setServerErrors([]))
            resetForm()
        } catch(err) {
            dispatch(setServerErrors(err.response.data.errors))
        }
    }
}

const addProduct = (product) => {
    return {
        type: "ADD_PRODUCT",
        payload: product 
    }
}

export const setServerErrors = (errors) => {
    return { 
        type: "SET_ERRORS",
        payload: errors 
    }
}