class Api::CommentsController < ApplicationController

    def create
        @feature = Feature.find(params[:feature_id])
        @comment = @feature.comments.create(comment_params)
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'Feature not found' }, status: :not_found
    end

    def index
        @comments = Comment.where(feature_id: params[:feature_id])
        render :index
    end

    private 
    def comment_params
        params.require(:comment).permit(:body)
    end
    
end
