class TrainersController < ApplicationController
    def index
        @trainers = Trainer.all
        render json: @trainers, status: 200, include: [:pokemon]
    end

    def show
        trainer = Trainer.find_by(id:[params[:id]])
        render json: trainer, status: 200
    end
end
