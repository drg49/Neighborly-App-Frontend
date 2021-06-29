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
            setResults(usaCities.filter((item, index) =>
                item.city.toLowerCase().startsWith(search.toLowerCase().replace( /\s\s+/g, ' ' ))
            ).map((item, index) => {
                console.log(item)
            }))
        } else {
            setResults(null)
        }
    }

    return (
        <>
            <h2>Search for your city</h2>
            <input type="text" onChange={handleChange} />
        </>
    )
}

export default SearchBar