import axios from 'axios'
import { CustomersContext } from '../contexts/root-context'
import { useState, useContext, useEffect } from 'react'
// import useState
export default function CustomerForm(props){
    const { customers, customerDispatch } = useContext(CustomersContext)

    const customer = customers.data.find(ele => ele._id == props.editId)
    const [form, setForm] = useState(customer ? {
        name: customer.name,
        email: customer.contact.email,
        mobile: customer.contact.mobile
    } : {
        name: '',
        email: '',
        mobile: ''
    })

    useEffect(() => {
        return () => {
            customerDispatch({ type: "SET_ERRORS", payload: []})
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            name: form.name, 
            contact: {
                email: form.email,
                mobile: form.mobile
            }
        }
        try { 
            if(customer) {
                const response = await axios.put(`http://localhost:3050/api/customers/${customer._id}`, formData) 
                customerDispatch({ type: 'UPDATE_CUSTOMER', payload: response.data })
                props.toggle()
            } else {
                const response = await axios.post('http://localhost:3050/api/customers', formData)
                customerDispatch({ type: 'ADD_CUSTOMER', payload: response.data })
            }
            setForm({ name: '', email: '', mobile: ''})
            customerDispatch({ type: "SET_ERRORS", payload: []})

            
        } catch(err) {
            customerDispatch({ type: "SET_ERRORS", payload: err.response.data.errors })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target 
        setForm({...form, [name]: value })
    }

    return (
        <>
            { customers.serverErrors.length > 0 && (
                <div>
                    <h2>Server Errors</h2>
                    <ul>
                        { customers.serverErrors.map((ele, i) => {
                            return <li key={i}> {ele.msg} </li>
                        })}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                { /* create the form */ }
                <div className="form-group">
                    <label 
                        htmlFor="name" 
                        className="form-label"
                    >Name</label>
                    <input 
                        type="text" 
                        value={form.name} 
                        onChange={handleChange} 
                        name="name" 
                        id="name" 
                        className='form-control'
                    /> 
                </div>

                <div className="form-group">
                    <label 
                        htmlFor="Email" 
                        className="form-label"
                    >Email</label>
                    <input 
                        type="text" 
                        value={form.email} 
                        onChange={handleChange} 
                        name="email" 
                        id="email" 
                        className='form-control'
                    /> 
                </div>
                <div className="form-group">
                    <label 
                        htmlFor="mobile" 
                        className="form-label"
                    >Mobile</label>
                    <input 
                        type="text" 
                        value={form.mobile} 
                        onChange={handleChange} 
                        name="mobile" 
                        id="mobile" 
                        className='form-control'
                    /> 
                </div>
                <input type="submit" /> 
            </form>
        </>
    )
}