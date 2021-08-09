import { Link } from "react-router-dom"
import Search from "../components/Search"

const Home = () => {
    return (
     <>
        <Search />
        <div id="request-city">
            <p>Can't find your city? Let us know!</p>
            <Link to="/contact">Add a city</Link>
        </div>
     </>
    )
}

export default Home