class PokemonsController < ApplicationController
    def create
        params[:pokemon][:nickname] = Faker::Name.first_name
        params[:pokemon][:species] = Faker::Games::Pokemon.name
        @pokemon = Pokemon.create(pokemon_params)

        render json:@pokemon, status: 201
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end
end
