class Api::FeaturesController < ApplicationController
    def index
        per_page = params[:per_page].to_i
        per_page = [per_page, 1000].min
        @features = Feature.paginate(:page => params[:page], per_page: per_page)
        if params[:mag_type]
            mag_type = params[:mag_type]
            @features = @features.where(mag_type: params[:mag_type])
        end
        render :index
    end
end
