const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function addPokemon(t_id){
    config = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            pokemon: {
                trainer_id: t_id
            }
        })
    }

    fetch(POKEMONS_URL, config)
        .then(r => r.json())
        .then(pokemon => {
            let li = document.createElement("li")
            li.innerText = `${pokemon.nickname} (${pokemon.species})`
            let pokeButton = document.createElement("button")
            pokeButton.className = "release"
            pokeButton.setAttribute("data-pokemon-id", pokemon.id)
            pokeButton.innerText = "Release"
            li.appendChild(pokeButton)

            let ul = document.querySelector(`button#trainer${t_id}`)
            ul.appendChild(li)
        })

}

const main = document.querySelector("main")
let dataCounter = 1;

fetch(TRAINERS_URL).then(response => response.json()).then(trainers => {
    trainers.forEach(trainer => {
        let div = document.createElement("div")
        div.className = "card"
        div.setAttribute("data-id", dataCounter++)

        let trainerName = document.createElement("p")
        trainerName.innerText = trainer.name
        div.appendChild(trainerName)

        const button = document.createElement("button")
        button.setAttribute("data-trainer-id", trainer.id)
        button.setAttribute("id", `trainer${button["attributes"]["data-trainer-id"].value}`)
        button.innerText = "Add Pokemon"
        div.appendChild(button)

        const ul = document.createElement("ul")
        div.appendChild(ul)

        trainer.pokemons.forEach(pokemon => {
            let li = document.createElement("li")
            li.innerText = `${pokemon.nickname} (${pokemon.species})`
            let pokeButton = document.createElement("button")
            pokeButton.className = "release"
            pokeButton.setAttribute("data-pokemon-id", pokemon.id)
            pokeButton.innerText = "Release"
            li.appendChild(pokeButton)
            ul.appendChild(li)
        })
        main.appendChild(div)        
    })

    const addPokemonButtons = document.querySelectorAll('div.card > button');

    addPokemonButtons.forEach(button => {
        button.addEventListener('click', e => {
            addPokemon(button["attributes"]["data-trainer-id"].value);
        })
    })
})

