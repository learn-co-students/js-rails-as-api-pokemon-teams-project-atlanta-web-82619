const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const trainersDiv = document.querySelector("#trainers")

config = {
    method: 'POST',
    headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        pokemon: {
            trainer_id: 1
        }
    })
}

fetch(POKEMONS_URL, config)

let dataCounter = 1;

fetch(TRAINERS_URL).then(response => response.json()).then(trainers => {
    trainers.forEach(trainer => {
        let div = document.createElement("div")
        div.className = "card"
        div.attributes["data-id"] = dataCounter++
        let trainerName = document.createElement("p")
        trainerName.innerText = trainer.name
        div.appendChild(trainerName)
        const button = document.createElement("button")
        button["data-trainer-id"] = trainer.id
        button.innerText = "Add Pokemon"
        div.appendChild(button)
        const ul = document.createElement("ul")
        div.appendChild(ul)
        trainer.pokemons.forEach(pokemon => {
            let li = document.createElement("li")
            li.innerText = `${pokemon.nickname} (${pokemon.species})`
            let pokeButton = document.createElement("button")
            pokeButton.class = "release"
            pokeButton["data-pokemon-id"] = pokemon.id
            pokeButton.innerText = "Release"
            li.appendChild(pokeButton)
            ul.appendChild(li)
        })
        trainersDiv.appendChild(div)
    })
})