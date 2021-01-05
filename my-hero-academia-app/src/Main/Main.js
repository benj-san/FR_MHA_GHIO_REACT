import React, { useState, useEffect } from 'react';
import './main.css';

//Ici nous allons créer une fonction qui permettra de récupérer l'API voulue (ici My Hero Academia api : https://myheroacademiaapi.com/)
//Nous utiliserons l'apu fetch afin de récupérer les données de l'API
//Nous allons également nous permettre de faire un tri dans toutes ces données receptionnées afin d'avoir un jeu de donnée plus "pures"
//On profitera ici des hooks useState et useEffect afin de pouvoir transmettre les paramètres du state et éviter de devoir transformer la fonction composant 
//heritante en classe, et d'obtenir des states, Le hook useEffect, lui, permettra de traiter notre récupération "à la volée" et de manière asynchrone afin de ne pas 
//géner le chargement de la page pendant la récupération des des données de l'API ainsi que leur traitement
function useFetch (url) {
    //Le state ici évoluera en fonction de ce qu'on veut faire de lui pour ses différents paramètres, à la manière d'une variable que l'on modifierais tout au long 
    //de notre fonction
    const [state, setState] = useState({
    charactersList: [],
    loading: true
    })

    useEffect(() => {
        //Ici le fait d'effectuer cette fonction d emanière asynchrone permet de ne pas géner le temps de chargement de la page durant la 
        //récupération de données, aussi, await (ne s'utilise que dans une fonction de type asynchrone) permet de mettre en pause le traitement
        // de la donnée et de la reprendre lorsque désirée.
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

//Une fois la fonction de récupération créée, nous allons implémenter une fonction composant afin de transformer en liste affichable en html les données obtenues
//La fonction javascript "map" est ici très utile afin de créér rapidement de multiples lignes pour chaque personnage récupéré
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

//Une fois fait, il ne nous reste plus qu'à implémenter le composant dans celui qui englobe la totalité de notre liste de personnage
function Main() {

    return (
        <main className="app-main">
            <h1>Liste des personnages :</h1>
            <CharacterList />
        </main>
    )
}

export default Main;