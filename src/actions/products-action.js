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

