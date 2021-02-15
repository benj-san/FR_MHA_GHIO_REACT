import './searchBar.css';
import React, { useState } from 'react';

function dynamicDisplay () {
        window.location.pathname !== "/" ? document.getElementById('header-searchBar').className = "d-none" : document.getElementById('header-searchBar').className = "form-control rounded-pill" ;
}

function filterTextChanged (filterText = "") {

    const textFiltered = filterText
    return textFiltered
}

function SearchBar() {

    const [state, setState] = useState({
        filterText : ""
    })

    function textFilterChanged(e){
        setState({
            filterText : e.target.value
        })

        //Ici on modifiera l'affichage du tableau de personnages avant de le renvoyer au main

    }

    filterTextChanged(state.filterText)

    return (
        <div className="col-3 offset-8 app-searchbar">
            <input id="header-searchBar" value={state.filterText} type="text" placeholder= "search for a hero" onChange={textFilterChanged} />
        </div>
        )
}

export {filterTextChanged, SearchBar, dynamicDisplay}