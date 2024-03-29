import { useState } from 'react' 
export default function AddProduct() {
    // name, price, description, stockLevel, reorderLevel
    const [form, setForm] = useState({ 
        name: '',
        price: '', 
        description: '',
        stockLevel: '',
        reorderLevel: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value })
    }
    return (
        <>
            <h2>Add Product</h2>
            <form >
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