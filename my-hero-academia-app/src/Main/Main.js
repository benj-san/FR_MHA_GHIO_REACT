import React, { useState, useEffect } from 'react';
import './main.css';

function useFetch (url) {
    const [state, setState] = useState({
    charactersList: [],
    loading: true
    })

    useEffect(() => {
        (async () => {
            const response = await fetch(url)
            const dataFetched = await response.json()
            let characterProperList = []
            let charaId = 0
            if (response.ok) {
                for(let character of dataFetched.result) {
                    characterProperList.push(
                    {'id' : charaId, 
                    'name' : character.name, 
                    'alias' : character.alias, 
                    'japanese name' : character.kanji,
                    'blood type' : character.bloodtype,
                    'gender' : character.gender,
                    'description' : character.description,
                    'power' : character.quirk,
                    'status' : character.status,
                    'eye' : character.Eye,
                    'hair' : character.hair,
                    'height' : character.height,
                    'occupation' : character.occupation,
                    'pictures' : character.images,
                    'pictureNumber' : character.images.length -1
                    })
                    charaId++
                }
                setState({
                charactersList: characterProperList,


                loading: false
            })
            } else {
                alert('Woops, something went wrong, try again later')
                setState(status => ({...status, loading: false}))
            }
        })()
    }, [])

    return [
    state.loading,
    state.charactersList
    ]
}

function CharacterList () {
    const [loading, characterCards] = useFetch('https://myheroacademiaapi.com/api/character?affiliation=U.A')

    if(loading) return 'Page is loading ...'

    return <ul className="characterList">
        {characterCards.map( characterCard => <li key = {characterCard.id}>
            <button>{characterCard.name}</button>
            <img src={characterCard.pictures[Math.floor(Math.random() * (characterCard.pictureNumber - 0 + 1))]} alt={characterCard.name}/>
        </li>)}
    </ul>
}

function Main() {
        //!!!ATTENTION!!! Modification de cette partie du code afin de simplifier la tâche, via les fonctions useFetch et le composant CharacterList
        /* let characterData = []
        let idChara = 0

        fetch('https://myheroacademiaapi.com/api/character?affiliation=U.A')
        .then(
            (response) => {
                if(response.ok === false) {
                    const dataMissed = 'doesnt work bitch : ' + response.status;
                    return console.log(dataMissed);
                } else {
                    response.json().then((data) => {
                    const dataFetched = data.result
                    for(let character of dataFetched) {
                        characterData.push({'id' : idChara, 
                                            'name' : character.name, 
                                            'alias' : character.alias, 
                                            'japanese name' : character.kanji,
                                            'blood type' : character.bloodtype,
                                            'gender' : character.gender,
                                            'description' : character.description,
                                            'power' : character.quirk,
                                            'status' : character.status,
                                            'eye' : character.Eye,
                                            'hair' : character.hair,
                                            'height' : character.height,
                                            'occupation' : character.occupation,
                                            })
                        idChara++
                    }

                    return characterData;
                    })
                }
            }
        ).catch((error) => {
            return console.log('Found error : ', error)
        })

    console.log(characterData)*/

    return (
        <main className="app-main">
            <h1>Liste des personnages :</h1>
            <CharacterList />
        </main>
    )
}

export default Main;