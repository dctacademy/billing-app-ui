import { useParams } from 'react-router-dom'
import { CustomersContext } from '../contexts/root-context'
import { useContext } from 'react'
export default function CustomerShow(){
    const { customers } = useContext(CustomersContext)
    const { id } = useParams()
    const customer = customers.data.find(ele => ele._id == id )
    return (
        <div>
            <div>
                <h2>{ customer?.name } - { customer?.contact?.email} </h2>
            </div> 
        
        </div>
    )
}