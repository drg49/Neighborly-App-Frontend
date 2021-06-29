import Search from "../components/Search"
import emerald from "../components/emerald.gif"

const Home = () => {
    return (
    <>
        <div id="logo"><h1>Emerald Vaults</h1><img src={emerald}/></div>
        <Search />
    </>
    )
}

export default Home