import { useState, useReducer, useContext } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CustomersContext } from '../contexts/root-context'
import { startCreateInvoice } from '../actions/invoices-action'

const invoiceFormReducer = (state, action) => {
    switch(action.type) {
        case 'HANDLE_CHANGE' : {
            return {...state, [action.payload.name]: action.payload.value }
        }
        case 'ADD_ITEM' : {
            return {...state, lineItems: [...state.lineItems, action.payload ]}
        }
        case 'UPDATE_ITEM' : {
            return { ...state, lineItems: state.lineItems.map((ele) => {
                if(ele._id == action.payload) {
                    return {...ele, quantity: ele.quantity + 1}
                } else {
                    return ele 
                }
            })}
        }
        case 'INCREMENT' : {
            return {...state, lineItems: state.lineItems.map((ele) => {
                if(ele._id == action.payload) {
                        return {...ele, quantity: ele.quantity + 1}
                } else { 
                    return ele 
                }
            })}
        }
        case 'DECREMENT' : {
            return {...state, lineItems: state.lineItems.map((ele) => {
                if(ele._id == action.payload) {
                        return {...ele, quantity: ele.quantity - 1}
                } else { 
                    return ele 
                }
            })}
        }
        case 'REMOVE_ITEM' : {
            return {...state, lineItems: state.lineItems.filter(ele => ele._id != action.payload)}
        }
        default: {
            return {...state}
        }
    }
}

export default function InvoiceForm(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { customers } = useContext(CustomersContext)
    const [search, setSearch] = useState('')
    const [invoiceForm, invoiceDispatch] = useReducer(invoiceFormReducer, {
        customer: '',
        lineItems: [],
        taxes: '',
        discount: ''
    })

    const products = useSelector((state) => {
        return state.products
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // client side validations 
        // const reset = () => {
        //     // reset form info 
        // }
       const formData = {...invoiceForm}
       formData.lineItems = formData.lineItems.map((ele) => {
        return {
            product: ele._id, 
            quantity: ele.quantity
        }
       })

       const redirect = () => {
        navigate('/invoices')
       }
       dispatch(startCreateInvoice(formData, redirect))
       
    }

    const handleChange = (e) => {
        const { name, value} = e.target
        // setForm({...form, [name]: value })
        invoiceDispatch({ type: 'HANDLE_CHANGE', payload: { name, value }})
    }

    const handleAdd = (id) => {
        const product = products.data.find(ele => ele._id == id)
        const item = { _id: product._id, name: product.name, price: product.price, quantity: 1}
        const inLineItem = invoiceForm.lineItems.find(ele => ele._id == product._id) 
        if(inLineItem) {
            invoiceDispatch({ type: 'UPDATE_ITEM', payload: inLineItem._id})
        } else {
            invoiceDispatch({ type: 'ADD_ITEM', payload: item })
        }
        setSearch('')
    }

    const handleRemove = (id) => {
        const userConfirm = window.confirm("Are you sure?")
        if(userConfirm) {
            invoiceDispatch({ type: 'REMOVE_ITEM', payload: id })
        }
    }

    const calculateGrossTotal = () => {
        const result = invoiceForm.lineItems.reduce((acc, cv) => {
            return acc + cv.price * cv.quantity
        }, 0)
        // invoiceDispatch({ type: 'HANDLE_CHANGE', payload: { name: 'grossTotal', value: result }})
        return result 
    }

    const calculateNetTotal = () => {
        const grossTotal = invoiceForm.lineItems.reduce((acc, cv) => {
            return acc + cv.price * cv.quantity
        }, 0)
        const deductions = grossTotal * invoiceForm.discount / 100 
        const additions = grossTotal * invoiceForm.taxes / 100 
        return grossTotal - deductions + additions
    }

   
    return (
        <div className="row">
            <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder="Enter product name" />
            { search && (
                <ul>
                    { products.data.filter(ele => ele.name.toLowerCase().includes(search.toLowerCase())).map((ele) => {
                        return <li key={ele._id} onClick={() => {
                            handleAdd(ele._id)
                        }}>{ele.name}</li>
                    })}
                </ul>
            )}
            

            

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer</label>
                    <select value={invoiceForm.customer} onChange={handleChange} name="customer">
                        <option value="">Select</option>
                        { customers.data.map((ele) => {
                            return <option key={ele._id} value={ele._id}>{ele.name}</option>
                        })}
                    </select>
                </div>

                <h3>Line Items</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { invoiceForm.lineItems.map((ele) => {
                            return (
                                <tr key={ele._id}>
                                    <td>{ele.name}</td>
                                    <td>{ele.price}</td>
                                    <td>
                                    <button 
                                        onClick={() => {
                                            invoiceDispatch({ type: 'DECREMENT', payload: ele._id })
                                        }}
                                        disabled={ele.quantity == 1}
                                        > - </button>    

                                        {ele.quantity}

                                        <button onClick={() => {
                                            invoiceDispatch({ type: 'INCREMENT', payload: ele._id })
                                        }}>+</button>        
                                    </td>
                                    <td>{ ele.price * ele.quantity }</td>
                                    <td><button onClick={() => {
                                        handleRemove(ele._id)
                                    }}>remove</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className="form-group">
                    <label>Discount</label>
                    <input type="text" value={invoiceForm.discount} name="discount" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Taxes</label>
                    <select value={invoiceForm.taxes} name="taxes" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="5">5%</option>
                            <option value="18">18%</option>
                    </select>
                </div> 
                <input type='submit' />
            </form>

            <h2>Gross Total - { calculateGrossTotal() } </h2>
            <p>Discount - { invoiceForm.discount }</p>
            <p>Taxes - { invoiceForm.taxes } </p>
            <h2>Net Total - { calculateNetTotal() }</h2>
           

            
        </div>
    )
}