import './App.css';
import Header from './Header/Header';
import About from './About/About';
import { Main, CharacterDetail } from './Main/Main';
import Footer from './Footer/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//Une fois importé, le module REACT ROUTER nous permet de déclarer des routes afin de modifier automatiquement l'url, permettre à l'utilisateur d'avoir un fil
//de navigation (boutons précedents etc) et de cabler ces routes sur le composant page vers lequel nous voulons le renvoyer
//On notera la présence d'urls dynamiques afin de pouvoir selectionner le profil du personnage, dans ce cas on utilise un path avec un placeholder 
//puis on déclare l'enfant vers lequel le chemin mène, ici le composant page "characterDetail"
function App() {

  return (
    <div className="app mw-100">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route path="/character/:name" children={<CharacterDetail />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
