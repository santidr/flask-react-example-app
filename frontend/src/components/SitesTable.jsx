const SitesTable = (props) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Sitename</th>
                    <th>URL</th>
                    <th>Username</th>
                    <th>Operations</th>
                </tr>
            </thead>

            <tbody>
                {props.sitesList.map(site => (
                    <tr key={site._id}>
                        <td>{site.sitename}</td>
                        <td>{site.siteurl}</td>
                        <td>{site.username}</td>
                        <td>
                            <button className="btn btn-seconday btn-sm"
                                onClick={() => props.editSite(site._id)}
                            >Edit
                                    </button>
                            <button className="btn btn-danger btn-sm"
                                onClick={() => props.deleteSite(site._id)}
                            >Delete
                                    </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SitesTable;