import { Switch, Route } from 'react-router';
import './App.scss';
import Logo from './components/Logo';
import Home from './pages/Home';
import Vault from './pages/Vault'

function App() {
  return (
    <div className="App">
      <Logo />
      <Switch>
        <Route exact path="/" render={(rp) =>  <Home {...rp}/>} />
        <Route path="/:city/:state" render={(rp) => <Vault {...rp}/>}/>
      </Switch>
      
    </div>
  );
}

export default App;
