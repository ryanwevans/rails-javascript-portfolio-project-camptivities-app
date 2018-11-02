class CampCounselorsController < ApplicationController
  skip_before_action :require_log_in, only: [:new, :create]
  before_action :set_counselor, only: [:show, :edit, :update, :destroy]

  def new
    @counselor = CampCounselor.new
  end

  def create
    @counselor = CampCounselor.create(counselor_params)
    if @counselor.save!
      session[:user_id] = @counselor.id
      redirect_to camp_counselor_path(@counselor)
    else
      render :new
    end
  end

  def show
    @assignments = @counselor.assignments
  end

  def edit
  end

  def update
    if @counselor.update(counselor_params)
      redirect_to camp_counselor_path(@counselor)
    else
      render :edit
    end
  end

  def destroy
    @counselor.destroy
    redirect_to new_camp_counselor_path
  end


  private

  def set_counselor
    @counselor = CampCounselor.find_by(id: session[:user_id])
  end

  def counselor_params
    params.require(:camp_counselor).permit(:name, :age, :leader, :password)
  end
end
