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
                                <td> { ele.name }</td>
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