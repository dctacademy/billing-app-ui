import axios from 'axios'
import { CustomersContext } from '../contexts/root-context'
import { useState, useContext } from 'react'
// import useState
export default function CustomerForm(){
    const { customers, customerDispatch } = useContext(CustomersContext)
    const [form, setForm] = useState({
        name: '',
       contact: {
        email: '',
        mobile: ''
       }
    })
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
            const response = await axios.post('http://localhost:3050/api/customers', formData)
            customerDispatch({ type: 'ADD_CUSTOMER', payload: response.data })
            customerDispatch({ type: "SET_ERRORS", payload: []})
            setForm({ name: '', email: '', mobile: ''})
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