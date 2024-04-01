import { CustomersContext } from "../contexts/root-context"
import { useContext } from "react"
import CustomersTable from "./CustomersTable"
import CustomerForm from "./CustomerForm"
export default function CustomersContainer(){
    const { customers } = useContext(CustomersContext)
    return (
        <div className="row">
            <h2>Listing Customers - { customers.data.length } </h2>
            <div className="col-md-8">
                <CustomersTable customers={customers} /> 
            </div>
            <div className="col-md-4">
                <h2>Add Customer</h2>
                <CustomerForm />
            </div>
        </div>
    )
}