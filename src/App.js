import { useState, createContext, useEffect } from 'react'
import { Switch, Route } from 'react-router';
import './App.scss';
import Logo from './components/Logo';
import Home from './pages/Home';
import Vault from './pages/Vault';
import Form from './pages/Form';
import Auth from './pages/Auth';
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyProfile from './pages/MyProfile';
import Success from './pages/Success';

export const GlobalCtx = createContext(null)


function App() {

  const [gState, setGState] = useState({
    url: "http://localhost:4000"/*'https://ev-backend-1.herokuapp.com'*/, 
    token: null
  })

  //SEEING IF ALREADY LOGGED IN
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    if (token) {
      setGState({...gState, token: token.token})
    }
  }, [])

  return (
    <GlobalCtx.Provider value = {{gState, setGState}}>
      <div className="App">
        <Logo />
        <Switch>
          <Route exact path="/" 
            render={(rp) =>  <Home {...rp}/>} 
          />
          <Route path="/:city/:state/vault" 
            render={(rp) => <Vault {...rp} />} 
          />
          <Route path="/:city/:state/post" 
            render={(rp => gState.token ? <Form {...rp}/> : <Auth />)} 
          />
          <Route path="/:city/:state/success" 
            render={(rp => gState.token ? <Success {...rp}/> : <Auth />)} 
          />
          <Route path="/auth" 
            render={(rp) => <Auth />}
          /> 
          <Route path="/login" 
            render={(rp) => <Login {...rp} />}
          />
          <Route path="/signup" 
            render={(rp) => <Signup {...rp} />}
          />
          <Route path="/myprofile" 
            render={(rp => gState.token ? <MyProfile {...rp}/> : <Auth />)}
          />
        </Switch>
      </div>
    </GlobalCtx.Provider>
  );
}

export default App;
