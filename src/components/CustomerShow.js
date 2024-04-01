import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CustomersContext } from '../contexts/root-context'
import { useContext } from 'react'
export default function CustomerShow(){
    const { customers, customerDispatch } = useContext(CustomersContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const customer = customers.data.find(ele => ele._id == id )

    const handleRemove = async() => {
        const userConfirm = window.confirm("Are you sure?")
        if(userConfirm){
            try {
                const response = await axios.delete(`http://localhost:3050/api/customers/${id}`)
                customerDispatch({ type: 'REMOVE_CUSTOMER', payload: response.data })
                navigate('/customers')
            } catch(err) {

            }
        }
    }
    return (
        <div>
            <div>
                <h2>{ customer?.name } - { customer?.contact?.email} </h2>

                <button onClick={handleRemove}>remove</button>
            </div> 
        
        </div>
    )
}