import './footer.css';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="app-footer fixed-bottom">
            <Link to="/about">About the author</Link>
        </footer>
    );
}

export default Footer;