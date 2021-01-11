import './searchBar.css';
import React, { useState } from 'react';

function dynamicDisplay () {
        window.location.pathname !== "/" ? document.getElementById('header-searchBar').className = "hidden" : document.getElementById('header-searchBar').className = "" ;
}

function filterTextChanged (filterText) {

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
    }

    filterTextChanged(state.filterText)

    return (
        <input id="header-searchBar" value={state.filterText} type="text" placeholder= "search for a hero" onChange={textFilterChanged} />
        )
}

export {filterTextChanged, SearchBar, dynamicDisplay}