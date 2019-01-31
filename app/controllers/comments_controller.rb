class CommentsController < ApplicationController
  before_action :set_camp, only: [:show, :edit, :update, :destroy]

  def index
    if params[:activity_id]
      @comments = Activity.find_by(id: params[:activity_id])
    else
      @comments = Comment.all
    end
  end

  def show
  end

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.create(comment_params)
    if @comment.save!
      redirect_to comment_path(@comment)
    else
      flash[:notice] = "Invalid Entry, Please Try Again"
      render new_comment_path
    end
  end

  def edit
  end

  def update
    if @comment.update(comment_params)
      redirect_to @comment
    else
      if @comment.title==""
        flash[:notice] = "Title is required"
      else @comment.content==""
        flash[:notice] = "Content is required"
      end
      render edit_comment_path
    end
  end

  def destroy
    @comment.destroy
    redirect_to activities_path
  end


  private

  def set_comment
    @comment = Comment.find_by(id: params[:id])
  end

  def comment_params
    params.require(:comment).permit(:title, :content)
  end

end
