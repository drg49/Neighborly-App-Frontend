import { useContext, useEffect, useState } from 'react'
import { GlobalCtx } from '../App'
import {Link}  from 'react-router-dom'
import PostCard from '../components/PostCard'

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
            setPosts(data.map((item, index) => {
                return (
                    <PostCard key={index} username={item.username} note={item.note} image={item.image}/>
                ) 
            }))
        })
    }

    useEffect(() => {
        if (token) {
            return null
        } else {
            localStorage.setItem("path", `/${city}/${state}/post`)
        }
        getPosts()
    }, [])

    return (
        <>
            <h2>{city}, {state}</h2>
            <Link to={`/${city}/${state}/post`}><button>Create a Post</button></Link><br />
            {posts}
        </>
    )

}

export default Vault