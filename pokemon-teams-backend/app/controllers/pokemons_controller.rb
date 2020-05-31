class PokemonsController < ApplicationController
    def create
        if (Trainer.find_by(id: params[:pokemon][:trainer_id]).pokemons.size < 6)
            params[:pokemon][:nickname] = Faker::Name.first_name
            params[:pokemon][:species] = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(pokemon_params)

            render json: pokemon, status: 201
        else
            render json: pokemon.errors, status: :unprocessable_entity
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end
end
