import { Link } from 'react-router-dom'
export default function CustomersTable(props){
    const { customers } = props 
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { customers.data.map((ele) => {
                        return (
                            <tr key={ele._id}>
                                <td> <Link to={`/customers/show/${ele._id}`}>{ ele.name }</Link></td>
                                <td> { ele.contact.email } </td> 
                                <td> { ele.contact.mobile } </td> 
                                <td> 
                                    <button>view details</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}