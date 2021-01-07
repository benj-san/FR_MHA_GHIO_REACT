import './header.css';
import './../SearchBar/SearchBar'
import { Link } from "react-router-dom";
import { SearchBar } from './../SearchBar/SearchBar';

function Header() {
    return (
        <header className="app-header">
            <Link to="/">Home</Link>
            <SearchBar />
        </header>
    );
}

export default Header;