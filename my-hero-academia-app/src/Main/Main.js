import React, { useState, useEffect } from 'react';
import './main.css';
import { useParams, Link } from "react-router-dom";
import BackButton from './../BackButton/BackButton';
import { dynamicDisplay } from './../SearchBar/SearchBar';


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
        // !!!IMPORTANT!!! Un seul useEffect par fonction, et la methode async s'emploie au départ d'une fonction
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

        //On affiche ou non la barre de recherche selon le chemin du site ou l'on se situe :
        dynamicDisplay()
    }, [])

    return [
    state.loading,
    state.charactersList
    ]
}

//Une fois la fonction de récupération créée, nous allons implémenter une fonction composant afin de transformer en liste affichable en html les données obtenues
//La fonction javascript "map" est ici très utile afin de créér rapidement de multiples lignes pour chaque personnage récupéré
//Afin de proposer des liens dynamiques, on va utiliser le nom de chaque personnage afin de l'insérer dans l'url, pour cela on transformera tous les espaces en traits d'unions
function CharacterList () {
    const [loading, characterCards] = useFetch('https://myheroacademiaapi.com/api/character?affiliation=U.A')

    if(loading) return 'Page is loading ...'

    return (
        <ul className="characterList">
            {characterCards.map( characterCard => <li key = {characterCard.id} id={`character-${characterCard.id}`} >
                <Link to={`/character/${characterCard.name.replace(' ', '-')}`}>{characterCard.name}</Link>
                <img src={characterCard.pictures[Math.floor(Math.random() * (characterCard.pictureNumber - 0 + 1))]} alt={characterCard.name}/>
            </li>)}
        </ul>
    )
}

//Le composant detail est un peu particulier car, lui, se doit d'être dynamique, afin de rendre les informations du personnage convenu lors du click sur
//ce dernier, on utilise alors le useParams proposé par REACT ROUTER afin d'obtenir le nom de l'url séléctionnée, puis on déliera le trait d'union en le
//transformant en espace, ainsi on pourra retrouver le nom du personnage et filtrer afin de retrouver toutes les informations concernant ce dernier
function CharacterDetail () {

    let { name } = useParams();

    const CharacterName = name.replace('-', ' ')

    const [loading, characterCards] = useFetch('https://myheroacademiaapi.com/api/character?affiliation=U.A')

    if(loading) return 'Here comes a new challenger !'

    const characterFound = characterCards.filter(characterCard => characterCard.name === CharacterName);

    return (
        <main className="app-detail">
            <h1>Personnage : {characterFound[0].name}</h1>
            <article>{characterFound[0].description}</article>
            < BackButton />
        </main>
    )
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

export {
    Main,
    CharacterDetail
}