import './searchBar.css';
import React, { useState } from 'react';

function filterTextChanged (filterText) {

    const textFiltered = filterText
    return textFiltered
}

function SearchBar() {

    const [state, setState] = useState({
        filterText : "plus Ultra"
    })

    function textFilterChanged(e){
        setState({
            filterText : e.target.value
        })
    }

    filterTextChanged(state.filterText)

    return (
        <input value={state.filterText} type="text" placeholder= "search for a hero" onChange={textFilterChanged} />
        )
}

export {filterTextChanged, SearchBar}