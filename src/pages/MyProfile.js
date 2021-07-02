import { useContext, useEffect, useState } from 'react'
import { GlobalCtx } from '../App'
import {Link}  from 'react-router-dom'
import PostCard from '../components/PostCard'
import Logout from "../components/Logout"

const MyProfile = () => {

    const { gState } = useContext(GlobalCtx)
    const { url, token } = gState
    const user = localStorage.getItem("user")

    const [posts, setPosts] = useState(null)

    const getPosts = () => {
        fetch(`${url}/post/user/${user}`, {
            method: "get"
        }).then(response => response.json())
        .then(data => {
            setPosts(data.reverse().map((item, index) => {
                return (
                    <PostCard key={index} username={item.username} note={item.note} image={item.image} realuser={item.realuser} id={item._id} date={item.created_at}/>
                ) 
            }))
        })
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
        <div id="nav">
            <h3>{user}</h3>
            <Logout />
        </div>
        {posts}
        </>
    )
}

export default MyProfile