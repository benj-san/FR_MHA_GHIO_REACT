import './header.css';
import './../SearchBar/SearchBar'
import { Link } from "react-router-dom";
import { SearchBar } from './../SearchBar/SearchBar';

function Header() {
    return (
        <header className="app-header container-fluid fixed-top border-bottom">
            <div className="row align-items-center">
                <Link to="/" className="col-1">
                    <img className="header_logo" src="./home_icon.png" alt="My hero academia : Heroes list. Home"/>
                </Link>
                <SearchBar />
            </div>
        </header>
    );
}

export default Header;