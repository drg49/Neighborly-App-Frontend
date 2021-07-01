import { useContext, useState } from 'react'
import { GlobalCtx } from '../App'

const PostCard = ({username, note, image, realuser, id}) => {

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
        <p>{username}</p>
        <p>{note}</p>
        {image ? <img src={`https://drg-s3-4.s3.amazonaws.com/${image}`} alt={`Post by ${username}`} id="post-img" /> : null}
        {currentUser === realuser ? image ? <div onClick={() => handleDelete(image)}>deleteimg</div> : <div onClick={() => postOnlyDelete(id)}>deletepost</div> : null}
        </div>
    )
}

export default PostCard