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
    loading: true,
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
                    'japaneseName' : character.kanji,
                    'bloodType' : character.bloodtype,
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

function SearchCharacter (props) {
    return <input id="header-searchBar" value={props.filterText} type="text" placeholder= "search for a hero" onChange={props.textFilterChanged} />
}

function CharacterCards (props) {
    return (
    <React.Fragment>
        {props.characterCards.map( characterCard =><li className="col-12 col-md-6 col-lg-4 position-relative" key = {characterCard.id} id={`character-${characterCard.id}`} >
            <Link  to={`/${characterCard.name.replace(' ', '-')}`}>
                <img className="position-relative" src={characterCard.pictures[Math.floor(Math.random() * (characterCard.pictureNumber - 0 + 1))]} alt={characterCard.name}/>
                <h2 className="character-name position-absolute border-bottom" >{characterCard.name}</h2>
            </Link>
        </li>)}
    </React.Fragment>
    )
}

//Une fois la fonction de récupération créée, nous allons implémenter une fonction composant afin de transformer en liste affichable en html les données obtenues
//La fonction javascript "map" est ici très utile afin de créér rapidement de multiples lignes pour chaque personnage récupéré
//Afin de proposer des liens dynamiques, on va utiliser le nom de chaque personnage afin de l'insérer dans l'url, pour cela on transformera tous les espaces en traits d'unions
function CharacterList () {

    const [state, setState] = useState({
        filterText : ""
    })

    const [loading, characterCards] = useFetch('https://myheroacademiaapi.com/api/character?affiliation=U.A')

    if(loading) return 'Page is loading ...'



    function textFilterChanged(e){
        setState({
            filterText : e.target.value
        })
    }

    function sortCharacter() {

    }

    return (
        <React.Fragment>
            <SearchCharacter filterText = {state.filterText} textFilterChanged = {(e) => textFilterChanged(e)} />
            <ul className="characterList row gx-4 gy-4">
                <CharacterCards
                    characterCards = {characterCards}
                />
            </ul>
        </React.Fragment>
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
        <main className="app-detail container">
            <div className="row position-relative">
                <span className="yellow-effect position-absolute w-100"></span>
                <h1 className="pt-2 pb-2 w-50 m-auto text-center mb-5 mt-5 border text-uppercase" >{characterFound[0].name}</h1>
            </div>
            <article className="row">
                <div className="character-description col-12 mb-5">{characterFound[0].description}</div>
                <div className="character-details col-sm-5 col-12">
                    Alias : {characterFound[0].alias ? characterFound[0].alias : "Unknown"} <br/>
                    Japanese name : {characterFound[0].japaneseName ? characterFound[0].japaneseName : "Unknown"} <br/>
                    Power : {characterFound[0].power ? characterFound[0].power : "Unknown"} <br/>
                    Occupation : {characterFound[0].occupation ? characterFound[0].occupation : "Unknown"} <br/>
                    Status : {characterFound[0].status ? characterFound[0].status : "Unknown"} <br/>
                </div>
                <div className="character-details col-12 col-sm-5 offset-sm-2">
                    Blood Type : {characterFound[0].bloodType ? characterFound[0].bloodType : "Unknown"} <br/>
                    Gender : {characterFound[0].gender ? characterFound[0].gender : "Unknown"} <br/>
                    height : {characterFound[0].height ? characterFound[0].height : "Unknown"} <br/>
                    eye : {characterFound[0].eye ? characterFound[0].eye : "Unknown"} <br/>
                    hair : {characterFound[0].hair ? characterFound[0].hair : "Unknown"} <br/>
                </div>
                <ul className="character-pics row">
                    {characterFound[0].pictures.map((characterPic, i) => <li className="col-12 col-sm-6 col-lg-4 gx-5 gy-5" key={i}><img src={characterPic} alt=""/></li>)}
                </ul>
            </article>
            <BackButton />
        </main>
    )
}

//Une fois fait, il ne nous reste plus qu'à implémenter le composant dans celui qui englobe la totalité de notre liste de personnage
function Main() {

    return (
        <main className="app-main container">
            <div className="row position-relative">
                <span className="yellow-effect position-absolute w-100"></span>
                <h1 className="pt-2 pb-2 w-50 m-auto text-center mb-5 mt-5 border" >The Daily Heroes Gazette :</h1>
            </div>
            <CharacterList />
        </main>
    )
}

export {
    Main,
    CharacterDetail
}