import { Switch, Route } from 'react-router';
import './App.scss';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={(rp) =>  <Home {...rp}/>} />
      </Switch>
      
    </div>
  );
}

export default App;
