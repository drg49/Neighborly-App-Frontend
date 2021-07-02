import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalCtx } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const leave = <FontAwesomeIcon icon={faArrowRight} size="xs"/>

const Logout = () => {
    
    const {gState, setGState} = useContext(GlobalCtx)
    let history = useHistory(null)

    const logout = (<h3 className="header-btn" id="logout" onClick={() => {
        localStorage.clear()
        setGState({...gState, token: null})
        history.push("/")
    }}>Logout {leave}</h3>)

    return  <>{gState.token ? logout : null}</>
}

export default Logout