import {Link}  from 'react-router-dom'

const Vault = (props) => {
    
    const city = props.match.params.city
    const state = props.match.params.state
    
    return (
        <>
            <h2>{city}, {state}</h2>
            <Link to={`/${city}/${state}/post`}><button>Create a Post</button></Link>
        </>
    )

}

export default Vault