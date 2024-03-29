import { useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { startCreateProduct, startUpdateProduct } from '../actions/products-action'
export default function ProductForm(props) {
    
    const dispatch = useDispatch()
    const serverErrors = useSelector((state) => {
        return state.products.serverErrors
    })

   
    const product = useSelector((state) => {
        return state.products.data.find(ele => ele._id == props.editId )
    })

    console.log(product)

    // name, price, description, stockLevel, reorderLevel
    const [form, setForm] = useState(product ? {
        name: product.name,
        price: product.price,
        description: product.description,
        stockLevel: product.stockLevel,
        reorderLevel: product.reorderLevel
    } : {
        name: '',
        price: '',
        description: '',
        stockLevel: '',
        reorderLevel: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // run client validations 

        const resetForm = () => {
            setForm({ 
                name: '',
                price: '',
                description: '',
                reorderLevel: '',
                stockLevel: ''
            })
        }

        if(product) {
            dispatch(startUpdateProduct(product._id, form, resetForm, props.toggle))
        } else {
            dispatch(startCreateProduct(form, resetForm))      
        }
        
    }

    return (
        <>
            {
                serverErrors.length > 0 &&  (
                    <div>
                        These errors prohibited the form from being saved: 
                        <ul>
                            { serverErrors.map((ele, i) => {
                                return <li key={i}> { ele.msg }</li>
                            })}
                        </ul>
                    </div>
                )
            }
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="name"
                    >Name</label>
                    <input 
                        type="text" 
                        value={form.name} 
                        onChange={handleChange} 
                        name="name" 
                        className="form-control"
                        id="name"
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="price"    
                    >Price</label>
                    <input 
                        type="text" 
                        value={form.price} 
                        onChange={handleChange} 
                        name="price" 
                        id="price"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label
                        className="form-label"
                        htmlFor="description"
                    >Description</label>
                    <textarea
                        className="form-control"
                        value={form.description}
                        onChange={handleChange} 
                        name="description"
                        id="description"
                    >
                    </textarea>
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="stockLevel"    
                    >Stock Level</label>
                    <input 
                        type="text" 
                        value={form.stockLevel} 
                        onChange={handleChange} 
                        name="stockLevel" 
                        id="stockLevel"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="reorderLevel"    
                    >Reorder Level</label>
                    <input 
                        type="text" 
                        value={form.reorderLevel} 
                        onChange={handleChange} 
                        name="reorderLevel" 
                        id="reorderLevel"
                        className="form-control"
                    />
                </div>
                <input type="submit" className="btn btn-primary" />
            </form>
        </>
    )
}