import ProductsTable from "./ProductsTable"
import ProductForm from "./ProductForm"
import { useDispatch, useSelector } from 'react-redux'
import { setServerErrors } from "../actions/products-action"
import { useEffect } from 'react' 

export default function ProductsContainer() {
    const dispatch = useDispatch()
    const products = useSelector((state) => {
        return state.products
    })

    useEffect(() => {
        return () => {
            dispatch(setServerErrors([]))
        }
    }, [dispatch])

    return (
        <div className="row">
            <h2>Total Products - { products.data.length }</h2>
            <div className="col-md-8">
                <ProductsTable products={products} />
            </div>
            <div className="col-md-4">
                <h2>Add Product</h2>
                <ProductForm />
            </div>
        </div>
    )
}