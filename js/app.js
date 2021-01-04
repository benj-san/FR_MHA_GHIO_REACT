/*  Pour commencer nous allons créer une simple fonction afin d'afficher notre premier composant qui sera le container
    Pour cela nous créons la fonction "render" dans laquelle nous allons créer une variable constante avec une div accueillant un titre
    Nous utilisons ensuite REACT afin d'effectuer le rendu de la constante, au lieu selectionné, ici dans la div ayant l'id react_app
    de notre fichier html */

function render() {
    const container = <div id = "container">
        <h1>Ici le projet commence</h1>
    </div>
    ReactDOM.render(container, document.getElementById('react_app'));
}

// Nous lançons ensuite la fonction.
render();