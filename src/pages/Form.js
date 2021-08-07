import {useState, useRef, useContext} from 'react'
import { useHistory } from 'react-router'
import { GlobalCtx } from '../App'
import { Link } from 'react-router-dom'

const Form = (props) => {

    const { gState, setGState } = useContext(GlobalCtx)
    const { url, token } = gState

    const city = props.match.params.city
    const state = props.match.params.state

    let history = useHistory()
    
    const bodyRef = useRef()

    const [words, setWords] = useState(1000)
    const count = () => {
        setWords(1000 - bodyRef.current.value.length)
    }

    const [file, setFile] = useState(null)
    const [img, setImg] = useState(null)
    const [postBtn, setPostBtn] = useState(<button type="submit">Post</button>)
    let base64;

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        console.log(file)
        setFile(file)
        base64 = await convertBase64(file);
        const str = base64
        if (str.charAt(5) + str.charAt(6) + str.charAt(7) + str.charAt(8) + str.charAt(9) === "image") {
            setImg(<img src={base64} alt="Your post" />)
        } else {
            setImg(<p>Please select an image file</p>)
            setFile(null)
        }
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          if (file) {
            fileReader.readAsDataURL(file);
          }
          fileReader.onload = () => {
            resolve(fileReader.result)
          }
          fileReader.onerror = (error) => {
            reject(error)
          }
        })
    }

    const handleCreate = (e) => {
        e.preventDefault()
        setPostBtn(null)
        let username;
        document.getElementById("anon").checked ? username = "Anonymous" : username = localStorage.getItem("user")
        const note = document.getElementById("note").value
        const location = city + state;
        const realuser = localStorage.getItem("user")
        if (file === null) { //If only text is added
            fetch(url + "/post/", {
              method: "post",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": "bearer " + token
                },
              body: JSON.stringify({note, username, location, realuser})
            }).then(() => history.push(`/${city}/${state}/vault`))
        } else if (file !== null) { //If an image is also added
            const formData = new FormData();
            formData.append("image", file)
                fetch(url + "/post/", {
                    method: "post",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": "bearer " + token
                    },
                    body: formData
                }).then(response => response.json())
                .then(data => {
                    fetch(url + "/post/" + data._id, {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "bearer " + token
                        },
                        body: JSON.stringify({note, username, location})
                    })
                }).then(setGState({...gState, refresh: true}))
                .then(history.push(`/${city}/${state}/vault`))
                        
        }
    }  


    return (
        <>
        <Link to={`/${city}/${state}/vault`}><h2 id="vault-location">{city}, {state}</h2></Link>
        <form id="create-form" onSubmit={handleCreate}>
            <div id="form-flex">
                <div>
                    <label htmlFor="regular">Post Publicly</label><br />
                    <input type="radio" defaultChecked name="post" />
                </div>
                <div>
                    <label htmlFor="regular">Post Anonymously</label><br />
                    <input type="radio" id="anon" name="post" />
                </div>
            </div>
            <textarea ref={bodyRef} id="note" maxLength="1000" onChange={count} required></textarea>
                <div id="post-bottom">
                    <div style={{textAlign: "left"}}>
                        <p>Characters left: {words}</p>
                        <input type="file" onChange={(e) => {uploadImage(e)}}/>
                    </div>
                    {postBtn}
                </div>
            {img}
        </form>
        </>
    )
}

export default Form