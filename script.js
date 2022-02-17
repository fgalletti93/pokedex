//navbar code

const hamburguerBtn = document.getElementById('hamburguerBtn');
const navBar = document.getElementById('navBar');

hamburguerBtn.addEventListener('click', () => {
    navBar.classList.toggle('open');
});


//pokedex code 

const pokedex = document.getElementById('pokedex');
const pokeCache = {};

//ES6 arrow function
const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((result, index) => ({
        ...result,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }));
    displayPokemon(pokemon);

};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map(pokeman => `
    <li class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-image" src="${pokeman.image}" />
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString
}

const selectPokemon = async (id) => {
    if (!pokeCache[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokeman = await res.json();
        pokeCache[id] = pokeman;
        displayPopup(pokeman);
    }
    displayPopup(pokeCache[id]);
}

const displayPopup = (pokeman) => {
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    const image = pokeman.sprites['front_default'];
    console.log(type)
    const htmlString = `
        <div class="popup">
            <button id="closeBtn"
            onclick="closePopup()">Close</button>
            <div class="card">
                <img class="card-image" src="${image}" />
                <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
                <p><small>Height:</small>${pokeman.height} | <small>Weight:</small>${pokeman.weight} | <small>Type:</small>${type}
            </div>
        </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
}

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}

fetchPokemon()