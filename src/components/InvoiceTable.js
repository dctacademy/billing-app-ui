import { CustomersContext } from "../contexts/root-context"
import { useContext } from 'react'
export default function InvoiceTable(props){
    const { customers } = useContext(CustomersContext)
    const { invoices } = props 
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th> customer </th>
                        <th> lineItems </th>
                        <th> gross </th>
                        <th> discount </th>
                        <th> taxes</th>
                        <th> net  </th>
                        <th> balance</th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    { invoices.map((ele) => {
                        return (
                            <tr key={ele._id}>
                                <td> { ele.customer.name } </td>
                                <td> { ele.lineItems.length } </td> 
                                <td> { ele.grossTotal }</td>
                                <td> { ele.discount }</td>
                                <td> { ele.taxes }</td>
                                <td> { ele.netTotal }</td>
                                <td> { ele.outstandingBalance }</td>
                                <td>
                                    <buton>more</buton>
                                    <button>pay</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}