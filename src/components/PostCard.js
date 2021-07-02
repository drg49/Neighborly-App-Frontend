import { useContext, useState } from 'react'
import { GlobalCtx } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
const moment = require('moment')

const trash = <FontAwesomeIcon icon={faTrash} />

const PostCard = ({username, note, image, realuser, id, date}) => {

    const { gState } = useContext(GlobalCtx)
    const { url, token } = gState

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


    return (
        <div id="post-card">
            <section>
                <p>{username}</p>
                <p>{moment(date).format('MM-DD-YYYY')}</p>
            </section>
        <p id="post-txt">{note}</p>
        {image ? <img src={`https://drg-s3-4.s3.amazonaws.com/${image}`} alt={`Post by ${username}`} id="post-img" /> : null}
        {currentUser === realuser ? image ? <div id="trash" onClick={() => handleDelete(image)}>{trash}</div> : 
        <div id="trash" onClick={() => postOnlyDelete(id)}>{trash}</div> : null}
        </div>
    )
}

export default PostCard