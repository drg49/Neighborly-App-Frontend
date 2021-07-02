import { useContext, useState } from 'react'
import { GlobalCtx } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
const moment = require('moment')

const trash = <FontAwesomeIcon icon={faTrash} />
const edit = <FontAwesomeIcon icon={faEdit} />

const PostCard = ({username, note, image, realuser, id, date}) => {

    const { gState } = useContext(GlobalCtx)
    const { url, token } = gState

    const [editForm, setEditForm] = useState(null)
    const [currentID, setCurrentID] = useState(null)
    let idVar; 

    const currentUser = localStorage.getItem("user")

    const handleDelete = (id) => {
        fetch(url + "/post/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "bearer " + token
            }
        }).then(() => window.location.reload())
    }

    const postOnlyDelete = (id) => {
        fetch(url + "/post/postonly/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "bearer " + token
            }
        }).then(() => window.location.reload())
    }

    const beginUpdate = (id, currentNote) => {
        setEditForm(<div id="create-caption"><textarea type="text" onChange={handleChange} id="update" value={currentNote} name="note" maxLength="1000"></textarea><br /><button onClick={() => handleUpdate(id)}>Done</button></div>)
        setCurrentID(id)
        idVar = id
    }

    const handleChange = (event) => {
        setEditForm(<div id="create-caption"><textarea type="text" onChange={handleChange} id="update" value={event.target.value} name="note" maxLength="1000"></textarea><br /><button id="upload-btn" onClick={() => handleUpdate(idVar)}>Done</button></div>)
    }

    const handleUpdate = (id) => {
        const note = document.getElementById("update").value
        fetch(url + "/post/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify({note})
        })
        .then(() => window.location.reload())
    }


    return (
        <div id="post-card">
            <section>
                <p>{username}</p>
                <p>{moment(date).format('MM-DD-YYYY')}</p>
            </section>
        <p id="post-txt">{editForm && currentUser === realuser && currentID === id ? editForm : note}</p>
        {image ? <img src={`https://drg-s3-4.s3.amazonaws.com/${image}`} alt={`Post by ${username}`} id="post-img" /> : null}
        {currentUser === realuser ? image ? 
        <div id="post-flex">
            <div id="trash" onClick={() => handleDelete(image)}>{trash}</div> 
            <div id="edit" onClick={() => beginUpdate(id, note)}>{edit}</div>
        </div>
        :
        <div id="post-flex"> 
            <div id="trash" onClick={() => postOnlyDelete(id)}>{trash}</div> 
            <div id="edit" onClick={() => beginUpdate(id, note)}>{edit}</div>
        </div>
        : null}
        </div>
    )
}

export default PostCard