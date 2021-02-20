import React, { useState, useEffect } from 'react';
// My components
import SitesForm from './SitesForm';
import SitesTable from './SitesTable';

const API = 'http://localhost:5000'

const Sites = () => {

    const [ sitename, setSitename] = useState('')
    const [ siteurl, setSiteurl] = useState('')
    const [ username, setUsername] = useState('')

    const [ sitesList, setSitesList ] = useState([])

    const [ editing, setEditing ] = useState(false)
    const [ id, setId ] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let response = ''

        if (!editing) {
            response = await fetch(`${API}/sites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sitename,
                    siteurl,
                    username
                })
            })
        } else {
            response = await fetch(`${API}/sites/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sitename,
                    siteurl,
                    username
                })
            })
            setEditing(false)
            setId('')
        }

        const data = await response.json()
        console.log(data)

        setSitename('')
        setSiteurl('')
        setUsername('')
    }

    const getSites = async () => {
        const response = await fetch(`${API}/sites`)
        const data = await response.json()
        setSitesList(data)
        await getSites()
    }

    useEffect(() => {
        getSites()
    }, [])

    const editSite = async (id) => {
        const response = await fetch(`${API}/sites/${id}`)
        const data = await response.json()
        
        setEditing(true)
        setId(id)
        
        setSitename(data.sitename)
        setSiteurl(data.siteurl)
        setUsername(data.username)
    }

    const deleteSite = async (id) => {
        const userResponse = window.confirm('Are you sure you want to delete this item?')
        if (userResponse) {
            const response = await fetch(`${API}/sites/${id}`, {
                method: 'DELETE'
            })
            const data = await response.json()
            console.log(data)
            await getSites()
        }
    }

    return (
        <div className="row">
            <div className="col-xs-12 col-md-4">
                <SitesForm
                    handleSubmit={handleSubmit} 

                    sitename={sitename}
                    siteurl={siteurl}
                    username={username}
                    setSitename={setSitename}
                    setSiteurl={setSiteurl}
                    setUsername={setUsername}
                    
                    id={id}
                    setId={setId}

                    editing={editing}
                    setEditing={setEditing}
                />
            </div>
            <div className="col-xs-12 col-md-8">
                <SitesTable
                    sitesList={sitesList}
                    editSite={editSite}
                    deleteSite={deleteSite} 
                />
            </div>
        </div>
    );
}

export default Sites;