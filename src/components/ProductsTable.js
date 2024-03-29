export default function ProductsTable(props) {
    const {data} = props.products 
    return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Stock Level</th>
                        <th>Reorder Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((ele) => {
                        return (
                            <tr key={ele._id}>
                                <td>{ ele.name }</td>
                                <td>{ ele.price }</td>
                                <td>{ ele.description }</td>
                                <td>{ ele.stockLevel }</td>
                                <td>{ ele.reorderLevel }</td>
                                <td>
                                        <button>show</button>
                                        <button>edit</button>
                                        <button>remove</button>
                                </td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
    )
}