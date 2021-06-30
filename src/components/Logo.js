import { Link } from "react-router-dom"
import emerald from "./emerald.gif"

const Logo = () => {
    return <Link to="/"><div id="logo"><h1>Emerald Vaults</h1><img src={emerald} alt="Emerald gif"/></div></Link>
}

export default Logo