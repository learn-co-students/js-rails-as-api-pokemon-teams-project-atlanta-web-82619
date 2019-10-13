class PokemonsController < ApplicationController
    def create
        poke = {}

        if Trainer.find_by(id: pokemon_params[:trainer_id]).pokemon.length < 6
            
            if pokemon_params[:species].nil?
                poke[:species] = Faker::Games::Pokemon.name
            end

            if pokemon_params[:nickname].nil?
                poke[:nickname] = Faker::Name.first_name
            end

            pokemon = Pokemon.create(pokemon_params.merge(poke))

            render json: pokemon
        else 
            render json: { error: 'Your party is full'}, status: 403
        end


    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end

    private
    def pokemon_params
        params.require(:pokemon).permit(:species, :nickname, :trainer_id)
    end
end
