import { useState } from 'react' 
import ProductForm from './ProductForm';
import { useDispatch } from 'react-redux'
import { setServerErrors, startRemoveProduct } from '../actions/products-action';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ProductsTable(props) {
    const dispatch = useDispatch()
    const [editId, setEditId] = useState('')
    const [modal, setModal] = useState(false);
    const {data} = props.products 

    const toggle = () => {
        setModal(!modal)
        dispatch(setServerErrors([]))
    }

    const handleRemove = (id) => {
        const userConfirm = window.confirm("Are you sure?")
        if(userConfirm) {
            dispatch(startRemoveProduct(id))
        }
    }

    const handleEdit = (id) => {
        setEditId(id)
        toggle()
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Stock Level</th>
                        <th>Reorder Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((ele) => {
                        return (
                            <tr key={ele._id}>
                                <td>{ ele.name }</td>
                                <td>{ ele.price }</td>
                                <td>{ ele.description }</td>
                                <td>{ ele.stockLevel }</td>
                                <td>{ ele.reorderLevel }</td>
                                <td>
                                        <button>show</button>
                                        <button onClick={(() => {
                                            handleEdit(ele._id)
                                        })}>edit</button>
                                        <button onClick={() => {
                                            handleRemove(ele._id)
                                        }}>remove</button>
                                </td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
           
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Edit Product</ModalHeader>
        <ModalBody>
            <ProductForm editId={editId} toggle={toggle} />
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
            </>
    )
}