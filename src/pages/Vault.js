import { useContext, useEffect, useState } from 'react'
import { GlobalCtx } from '../App'
import {Link}  from 'react-router-dom'

const Vault = (props) => {
    
    const { gState } = useContext(GlobalCtx)
    const { url } = gState

    const city = props.match.params.city
    const state = props.match.params.state
    
    const getPosts = () => {
        fetch(`${url}/post/${city + state}`, {
            method: "get"
        }).then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }

    useEffect(() => {
        getPosts()
    })


    return (
        <>
            <h2>{city}, {state}</h2>
            <Link to={`/${city}/${state}/post`}><button>Create a Post</button></Link>
        </>
    )

}

export default Vault