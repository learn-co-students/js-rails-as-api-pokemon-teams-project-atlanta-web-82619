const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

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