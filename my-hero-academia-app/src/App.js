import './App.css';
import Header from './Header/Header';
import About from './About/About';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//Une fois importé, le module REACT ROUTER nous permet de déclarer des routes afin de modifier automatiquement l'url, permettre à l'utilisateur d'avoir un fil
//de navigation (boutons précedents etc) et de cabler ces routes sur le composant page vers lequel nous voulons le renvoyer
function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
