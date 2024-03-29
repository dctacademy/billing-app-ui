import ProductsTable from "./ProductsTable"
import AddProduct from "./AddProduct"
import { useSelector } from 'react-redux'
export default function ProductsContainer() {
    const products = useSelector((state) => {
        return state.products
    })
    return (
        <div className="row">
            <h2>Total Products - { products.data.length }</h2>
            <div className="col-md-8">
                <ProductsTable products={products} />
            </div>
            <div className="col-md-4">
                <AddProduct />
            </div>
        </div>
    )
}