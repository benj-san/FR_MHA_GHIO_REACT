import './backButton.css';
import { Link } from "react-router-dom";


//On isole ici le button de lien vers la homepage car ce dernier sera utilisé sur plusieurs pages différentes
function BackButton() {

    return  <Link to="/">Back to menu</Link>
}

export default BackButton;