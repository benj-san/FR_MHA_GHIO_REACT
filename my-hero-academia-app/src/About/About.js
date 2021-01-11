import React, { useEffect } from 'react';
import './about.css';
import {ABOUT} from './../Data/ABOUT'
import BackButton from './../BackButton/BackButton';
import { dynamicDisplay } from './../SearchBar/SearchBar';

//Ici on développera une fonction composant sections qui intégrera au site autant de sections qu'il y a de paragraphes dans notre fichier de données,
//La fonction prendra alors un paramètre d'entrée, que nous nommerons sections qui correspondra à l'entrée de fichier sur lequel on souhaite boucler
function Sections (sections) {

    const sectionsArray =  sections.sections

    return <ul className="section-container">
        {sectionsArray.map( section =>
            <li key = {section.id}>
                <section>
                    <h2>{section.title}</h2>
                    <article>{section.content}</article>
                </section>
            </li>
        )}
    </ul>
}

//Ici nous auront le composant englobant la page ABOUT, et qui accueillera donc le composant sections
//On n'oubliera pas au moment de l'instanciation de notre composant section de lui spécifier le paramètre d'entrée "sections" ainsi que la constante à laquelle il se raporte
function About() {

    useEffect(() => {
        dynamicDisplay()
    }, [])

    return (
        <main className="app-about">
            <h1>En savoir plus sur ce site</h1>
            <Sections sections = {ABOUT}/>
            < BackButton />
        </main>
    );
}

export default About;