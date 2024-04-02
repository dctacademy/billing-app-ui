import axios from 'axios'
import { useReducer, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom'
import ProductsContainer from './components/ProductsContainer';
import CustomersContainer from './components/CustomersContainer';
import InvoiceContainer from './components/InvoicesContainer';
import InvoiceForm from './components/InvoicesForm';

import CustomerShow from './components/CustomerShow';
import Dashboard from './components/Dashboard';

import { CustomersContext } from './contexts/root-context';
import { startGetProducts } from './actions/products-action';
import { startGetInvoices } from './actions/invoices-action';

import customerReducer from './reducers/customers-reducer';

function App() {
  const dispatch = useDispatch()
  const [customers,customerDispatch] = useReducer(customerReducer, { data: [], serverErrors: []})

  useEffect(() => {
    dispatch(startGetProducts());
    dispatch(startGetInvoices());

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
        <Link to="/dashboard">Dashboard</Link> | 
        <Link to="/products">Products</Link> | 
        <Link to="/customers">Customers</Link> | 
        <Link to="/invoices">Invoices</Link> | 
        <Link to='/invoices/new'>Add Invoice</Link> | 
     
     <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/products" element={<ProductsContainer />}/>
        <Route path="/customers" element={<CustomersContainer />} />
        <Route path="/customers/show/:id" element={<CustomerShow />} />
        <Route path="/invoices" element={<InvoiceContainer />} />
        <Route path='/invoices/new' element={<InvoiceForm />} />
     </Routes>
    </div>
    </CustomersContext.Provider>
  ); 
}

export default App;
