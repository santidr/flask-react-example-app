const SitesForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="card card-body">
            <div className="form-group">
                <input type="text"
                    className="form-control"
                    onChange={(e) => props.setSitename(e.target.value)}
                    value={props.sitename}
                    placeholder="Sitename"
                    autoFocus
                />
            </div>
            <div className="form-group">
                <input type="text"
                    className="form-control"
                    onChange={(e) => props.setSiteurl(e.target.value)}
                    value={props.siteurl}
                    placeholder="Siteurl"
                />
            </div>
            <div className="form-group">
                <input type="text"
                    className="form-control"
                    onChange={(e) => props.setUsername(e.target.value)}
                    value={props.username}
                    placeholder="Username"
                />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
                {props.editing ? 'Update' : 'Create'}
            </button>
        </form>
    );
}

export default SitesForm;