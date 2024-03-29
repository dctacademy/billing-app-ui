import { useSelector } from 'react-redux' 
export default function Dashboard() {
    const products = useSelector((state) => { 
        return state.products
    })
    
    return (
        <div>
            <h2>Dashboard</h2>
            <h2>Total Products - { products.data.length } </h2>
        </div>
    )
}