class Api::CommentsController < ApplicationController

    def create
        @feature = Feature.find(params[:feature_id])
        @comment = @feature.comments.create(comment_params)

    end

    private 
        def comment_params
            params.require(:comment).permit(:body)
        end
end
