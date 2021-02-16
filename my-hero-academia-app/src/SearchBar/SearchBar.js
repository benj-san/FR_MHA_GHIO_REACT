import './searchBar.css';
import React, { useState } from 'react';

function dynamicDisplay () {
        window.location.pathname !== "/" ? document.getElementById('header-searchBar').className = "d-none" : document.getElementById('header-searchBar').className = "form-control rounded-pill" ;
}


function SearchBar() {

    const [state, setState] = useState({
        filterText : ""
    })

    function textFilterChanged(e){
        setState({
            filterText : e.target.value
        })
    }

    function handlePopMySearchBar() {
        const filterButton = document.getElementById("app-responsive-searchbar");
        const logo = document.getElementById("headerLogo")
        const searchBar = document.getElementById("searchBar")
        logo.classList.toggle("d-none")
        filterButton.classList.toggle("offset-7")
        searchBar.classList.toggle("d-none")
    }

    return (
        <React.Fragment>
            <div id="searchBar" className="d-none pb-5 pt-5 pb-md-0 pt-md-0 col-10 d-md-block col-md-4 col-xl-3 offset-xl-8 offset-md-6 app-searchbar">
                <input id="header-searchBar" value={state.filterText} type="text" placeholder= "search for a hero" onChange={textFilterChanged} />
            </div>
            <div id="app-responsive-searchbar" className="d-md-none col-2 offset-7 app-responsive-searchbar">
                <button onClick = {handlePopMySearchBar} id="filterButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-filter-right" viewBox="0 0 16 16">
                        <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z"/>
                    </svg>
                </button>
            </div>
        </React.Fragment>
    )
}

export {SearchBar, dynamicDisplay}