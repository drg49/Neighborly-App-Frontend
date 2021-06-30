import { Link } from "react-router-dom"

const Auth = ({setPathState, path}) => {

    setPathState(path) //For instance, if the user clicks on the upload btn before they log in, then after they log in they will be taken to the upload page

    return (
        <div id="auth">
            <p>Please login or register to continue.</p>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Signup</button></Link>
        </div>
    )
}

export default Auth