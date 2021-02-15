import './header.css';
import './../SearchBar/SearchBar'
import { Link } from "react-router-dom";
import { SearchBar } from './../SearchBar/SearchBar';

function Header() {
    return (
        <header className="app-header container-fluid fixed-top border-bottom">
            <div className="row align-items-center">
                <Link id="headerLogo" to="/" className="col-xl-1 col-md-2 col-3">
                    <img className="header_logo" src="./home_icon.png" alt="My hero academia : Heroes list. Home"/>
                </Link>
                <SearchBar />
            </div>
        </header>
    );
}

export default Header;