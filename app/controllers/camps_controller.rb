class CampsController < ApplicationController
  before_action :set_camp, only: [:show, :edit, :update, :destroy]
  include CampsHelper

  def index
    @camps = Camp.all
    respond_to do |f|
      f.html
      f.json {render json: @camps}
    end
  end

  def show
    respond_to do |f|
      f.html
      f.json {render json: @camp}
    end
  end

  def new
    @camp = Camp.new
  end

  def create
    @camp = Camp.create(camp_params)
    if @camp.save
      render json: @camp
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @camp.update(camp_params)
      redirect_to @camp
    else
      render :edit
    end
  end


  private

  def set_camp
    @camp = Camp.find_by(id: params[:id])
  end

  def camp_params
    params.require(:camp).permit(:name, :location, :description)
  end

end
