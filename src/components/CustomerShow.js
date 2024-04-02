import { useParams, useNavigate } from 'react-router-dom'
import CustomerForm from './CustomerForm'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import axios from 'axios'
import { CustomersContext } from '../contexts/root-context'
import { useState, useContext } from 'react'
export default function CustomerShow(){
    const [ editId, setEditId] = useState('')
    const [modal, setModal] = useState(false);
    const { customers, customerDispatch } = useContext(CustomersContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const customer = customers.data.find(ele => ele._id == id )

    console.log(customer)
    const toggle = () => {
        setModal(!modal)
    }

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

    const handleEdit = () => {
        setEditId(id)
        toggle()
    }

    return (
        <div>
            <div>
                <h2>{ customer?.name } - { customer?.contact?.email} </h2>

                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleRemove}>remove</button>
            </div> 
        
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Edit Product</ModalHeader>
                <ModalBody>
                    <CustomerForm editId={editId} toggle={toggle} />
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggle}>
                    Do Something
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}