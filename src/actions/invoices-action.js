import axios from 'axios' 

export const startGetInvoices = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3050/api/invoices')
            dispatch(setInvoices(response.data))
        } catch(err) {
            alert(err)
        }
    }
}

const setInvoices = (data) => {
    return {
        type: 'SET_INVOICES',
        payload: data 
    }
}

export const startCreateInvoice = (formData, redirect) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3050/api/invoices', formData)
            dispatch(addInvoice(response.data))
            redirect()
        } catch(err) {
            alert(err)
        }
    }
}

const addInvoice = (invoice) => {
    return { 
        type: 'ADD_INVOICE',
        payload: invoice
    }
}