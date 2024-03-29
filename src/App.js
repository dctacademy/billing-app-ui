import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom'
import { startGetProducts } from './actions/products-action';
import ProductsContainer from './components/ProductsContainer';
import Dashboard from './components/Dashboard';
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetProducts())
  }, [dispatch])

  return (
    <div className="App">

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/products">Products</Link>
     
     <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/products" element={<ProductsContainer />}/>
     </Routes>
    </div>
  ); 
}

export default App;
