import axios from 'axios'
import { useReducer, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom'
import { startGetProducts } from './actions/products-action';
import ProductsContainer from './components/ProductsContainer';
import CustomersContainer from './components/CustomersContainer';
import Dashboard from './components/Dashboard';
import customerReducer from './reducers/customers-reducer';
import { CustomersContext } from './contexts/root-context';

function App() {
  const dispatch = useDispatch()
  const [customers,customerDispatch] = useReducer(customerReducer, { data: [], serverErrors: []})

  useEffect(() => {
    dispatch(startGetProducts());

    (async () => {
      try { 
        const response = await axios.get('http://localhost:3050/api/customers')
        customerDispatch({ type: 'SET_CUSTOMERS', payload: response.data })
      } catch(err) {
        console.log(err) 
      }
    })()

  }, [dispatch])

  return (
    <CustomersContext.Provider value={{ customers, customerDispatch }}>
    <div className="App">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/customers">Customers</Link>
     
     <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/products" element={<ProductsContainer />}/>
        <Route path="/customers" element={<CustomersContainer />} />
     </Routes>
    </div>
    </CustomersContext.Provider>
  ); 
}

export default App;
