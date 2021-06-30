import {useState, useRef} from 'react'

const Form = (props) => {

    const city = props.match.params.city
    const state = props.match.params.state
    
    const bodyRef = useRef()
    const [words, setWords] = useState(1000)
    const count = () => {
        setWords(1000 - bodyRef.current.value.length)
    }

    const [file, setFile] = useState(null)
    const [img, setImg] = useState(null)
    let base64;

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        setFile(file)
        base64 = await convertBase64(file);
        const str = base64
        if (str.charAt(5) + str.charAt(6) + str.charAt(7) + str.charAt(8) + str.charAt(9) === "image") {
            setImg(<img src={base64} alt="Your post" id="uploaded-img"/>)
        } else {
          setImg(<p>Please select an image file</p>)
          setFile(null)
        }
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
  
          fileReader.onload = () => {
            resolve(fileReader.result)
          }
  
          fileReader.onerror = (error) => {
            reject(error)
          }
        })
      }

      

    return (
        <>
        <h2>{city}, {state}</h2>
        <form id="create-form">
            <div id="form-flex">
                <div>
                    <label htmlFor="regular">Post Publicly</label><br />
                    <input type="radio" id="regular" defaultChecked name="post" />
                </div>
                <div>
                    <label htmlFor="regular">Post Anonymously</label><br />
                    <input type="radio" id="anon" name="post" />
                </div>
            </div>
            <textarea ref={bodyRef} id="message" maxLength="1000" onChange={count} required></textarea>
                <div id="post-bottom">
                    <div style={{textAlign: "left"}}>
                    <p>Characters left: {words}</p>
                    <input type="file" />
                    </div>
                    <input type="submit" value="Post" onChange={(e) => {uploadImage(e)}}/>
                </div>
            {img}
        </form>
        </>
    )
}

export default Form