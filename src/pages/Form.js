import {useState, useRef} from 'react'

const Form = (props) => {

    const city = props.match.params.city
    const state = props.match.params.state
    
    const bodyRef = useRef()
    const [words, setWords] = useState(1000)
    const count = () => {
        setWords(1000 - bodyRef.current.value.length)
    }

    return (
        <>
        <h2>{city}, {state}</h2>
        <form id="create-form">
            <div id="form-flex">
                <div>
                    <label for="regular">Post Publicly</label><br />
                    <input type="radio" id="regular" checked="true" name="post"/>
                </div>
                <div>
                    <label for="regular">Post Anonymously</label><br />
                    <input type="radio" id="anon" name="post"/>
                </div>
            </div>
            <textarea ref={bodyRef} id="message" maxLength="1000" onChange={count} required></textarea>
                <div id="post-bottom">
                    <p>Characters left: {words}</p>
                    <input type="submit" value="Post"/>
                </div>
        </form>
        </>
    )
}

export default Form