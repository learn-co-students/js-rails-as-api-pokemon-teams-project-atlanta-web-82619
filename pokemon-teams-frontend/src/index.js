const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')


function getTrainers(){
    return fetch(TRAINERS_URL)
    .then(function(response){
        return response.json();
    })
}

function renderTrainers(){
    getTrainers()
    .then(function(trainers){
        console.log(trainers)
        trainers.forEach(function(trainer){

        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', `${trainer.id}`);
        

        const p = document.createElement('p');
        p.innerText = `${trainer.name}`;

        const button = document.createElement('button');
        button.setAttribute('data-trainer-id', `${trainer.id}`);
        button.innerText = 'Add Pokemon';

        const list = document.createElement('ul');
        trainer.pokemon.forEach(function(poke){
            const li = document.createElement('li');
            li.innerText = `${poke.nickname} (${poke.species})`;
            const releaseButton = document.createElement('button');
            releaseButton.setAttribute('data-pokemon-id', `${poke.id}`);
            releaseButton.innerText = 'Release';
            releaseButton.className = 'release'
            li.appendChild(releaseButton);
            list.appendChild(li);

            })
            card.appendChild(p);
            card.appendChild(button);
            card.appendChild(list);
            main.appendChild(card);
        });
    });  
};

main.addEventListener('click', function(e){
    // if button clicked has trainer id send post request to localhost:3000/pokemons
    if (e.target.dataset.trainerId !== undefined){
        const pokeObject = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                pokemon:{
                trainer_id: e.target.dataset.trainerId 
                }
            })
        }
        fetch(POKEMONS_URL, pokeObject)
        .then(function(response){
            return response.json();
        })
        .then(function(pokemon){
            const ul = e.target.nextElementSibling;
            const newLi = document.createElement('li');
            newLi.innerText = `${pokemon.nickname} (${pokemon.species})`;
            const release = document.createElement('button');
            release.setAttribute('data-pokemon-id', `${pokemon.id}`);
            release.innerText = 'Release';
            release.className = 'release';
            newLi.appendChild(release);
            if (pokemon.id !== undefined){ul.appendChild(newLi);}

            
        })
    }

    if (e.target.dataset.pokemonId !== undefined){
        e.target.parentElement.remove();
        fetch(POKEMONS_URL + '/' + e.target.dataset.pokemonId, {method: 'DELETE'})
    }
})







document.addEventListener('DOMContentLoaded',function(){
    renderTrainers();

})