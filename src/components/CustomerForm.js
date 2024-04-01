import axios from 'axios'
import { CustomersContext } from '../contexts/root-context'
import { useContext } from 'react'
// import useState
export default function CustomerForm(){
    const { customers, customerDispatch } = useContext(CustomersContext)
    // create state variable = { name: '', email: '', 'mobile' }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            name: 'customer 5', 
            contact: {
                email: 'customer5@gmail.com',
                mobile: '9876543215'
            }
        }
        try { 
            const response = await axios.post('http://localhost:3050/api/customers', formData)
            customerDispatch({ type: 'ADD_CUSTOMER', payload: response.data })
            customerDispatch({ type: "SET_ERRORS", payload: []})
        } catch(err) {
            customerDispatch({ type: "SET_ERRORS", payload: err.response.data.errors })
        }
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
                <input type="submit" /> 
            </form>
        </>
    )
}