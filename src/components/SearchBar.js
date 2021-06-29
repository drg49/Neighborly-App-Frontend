import { useState } from 'react'
import usaCities from '../dataset/usaCities'

const SearchBar = () => {

    const [results, setResults] = useState(null)

    const handleChange = (e) => {

        if (e.keyCode === 32) {
          e.preventDefault();
        }

        let search = e.target.value.trim()
        if (search.length >= 2) {
            setResults(
            <div id="search-scroll">
                {usaCities.filter((item, index) =>
                item.city.toLowerCase().startsWith(search.toLowerCase().replace( /\s\s+/g, ' ' ))
                ).map((item, index) => {
                return (
                    <p key={index}>{item.city}, {item.state}</p>
                )
                })}
            </div>
            )
        } else {
            setResults(null)
        }
    }

    return (
        <>
            <h2>Search for your city</h2>
            <input type="text" onChange={handleChange} id="searchbar"/>
            {results}
        </>
    )
}

export default SearchBar