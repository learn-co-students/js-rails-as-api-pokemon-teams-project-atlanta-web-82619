const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let main = document.querySelector('main');

getTrainers()

function getTrainers() {
  return fetch(TRAINERS_URL).then(res => res.json()).then(trainers => {
    trainers.forEach(trainer => {
        let trainerCard = document.createElement('div')
        trainerCard.setAttribute('class', 'card')
        trainerCard.dataset.id = trainer.id
        trainerCard.innerHTML = cardHTML(trainer)          
        trainerCard.addEventListener('click', buttonAction)
        main.append(trainerCard)
    })
  })
}

function cardHTML(trainer) {
    return `<p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul>
      ${trainer.pokemons.map(pokemon => 
        `<li>${pokemon.nickname} (${pokemon.species}) 
        <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`).join(' ')}
    </ul>`
}

function buttonAction(e) {
    if(e.target.innerText === "Add Pokemon") {
        let trainerId = e.target.dataset.trainerId
        createPokemon(trainerId)
        .then(pokemon => {
            if(pokemon.status !== 500) {
                let trainerCard = document.querySelector(`div[data-id='${pokemon.trainer_id}']`)
                let pokemonList = trainerCard.querySelector('ul')
                pokemonList.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) 
                <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
            } else {
                alert("You cannot have more than 6 pokemon!")
            }
        })
    }
    if(e.target.innerText === "Release") {
        let pokemonId = e.target.dataset.pokemonId
        e.target.parentNode.remove()
        releasePokemon(pokemonId)
    }
}

function createPokemon(trainerId) {
  return fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'trainer_id': trainerId
    })
  })
  .then(res => res.json())
}

function releasePokemon(pokemonId) {
  return fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: "DELETE",
  })
  .then(res => res.json())
}





