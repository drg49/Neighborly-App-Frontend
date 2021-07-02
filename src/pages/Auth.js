import { Link } from "react-router-dom"

const Auth = () => {

    return (
        <div id="auth">
            <p>Please login or register to continue.</p>
            <Link to="/login"><button id="login">Login</button></Link>
            <Link to="/signup"><button id="signup">Create Account</button></Link>
        </div>
    )
}

export default Auth