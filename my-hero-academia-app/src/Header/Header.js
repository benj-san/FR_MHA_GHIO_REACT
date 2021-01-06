import './header.css';
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="app-header">
            <Link to="/">Home</Link>
        </header>
    );
}

export default Header;