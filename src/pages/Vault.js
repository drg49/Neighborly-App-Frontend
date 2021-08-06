import { useContext, useEffect, useState } from 'react'
import { GlobalCtx } from '../App'
import {Link}  from 'react-router-dom'
import PostCard from '../components/PostCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import loadingGif from '../components/Loading.gif'

const user = <FontAwesomeIcon icon={faUser} size="lg"/>

const Vault = (props) => {
    
    const { gState } = useContext(GlobalCtx)
    const { url, token } = gState

    const city = props.match.params.city
    const state = props.match.params.state

    const [posts, setPosts] = useState(null)

    const getPosts = () => {
        fetch(`${url}/post/${city + state}`, {
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

    const handleProfileClick = () => {
        if (!token) {
            localStorage.setItem("path", `/${city}/${state}/vault`)
        }
        props.history.push("/myprofile")
    }

    const handleFormClick = () => {
        if (!token) {
            localStorage.setItem("path", `/${city}/${state}/post`)
        }
        props.history.push(`/${city}/${state}/post`)
    }

    useEffect(() => {
        getPosts()
    }, [])

    const message = <p id="nullMessage">Be the first to post in your neighborhood!</p>

    return (
        <>
            <div id="nav"><h2>{city}, {state}</h2><div id="user-icon" onClick={handleProfileClick}>{user}</div></div>
            <button onClick={handleFormClick}>Create a Post</button><br />
            {posts ? posts.length === 0 ? message : posts : <img src={loadingGif} alt="Posts are loading" id="load-gif" />}
        </>
    )

}

export default Vault