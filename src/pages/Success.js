import { Link } from "react-router-dom"

const Success = (props) => {
    const city = props.match.params.city
    const state = props.match.params.state

    return (
        <>
            <p id="success-message">Your post was added to {city}, {state}!</p>
            <Link to={`/${city}/${state}/vault`}><div id="go-to-post">Go to post</div></Link>
        </>
    )
}

export default Success