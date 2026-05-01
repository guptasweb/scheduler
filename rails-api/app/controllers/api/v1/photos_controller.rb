module Api
  module V1
    class PhotosController < BaseController
      before_action :set_post
      before_action :set_photo, only: [:destroy]

      # GET /api/v1/posts/:post_id/photos
      def index
        render json: @post.photos.map { |p| ::Api::V1::PhotoSerializer.render(p) }, status: :ok
      end

      # POST /api/v1/posts/:post_id/photos
      def create
        @photo = @post.photos.new(photo_params)

        if @photo.save
          render json: ::Api::V1::PhotoSerializer.render(@photo), status: :created
        else
          render json: { errors: @photo.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/posts/:post_id/photos/:id
      def destroy
        @photo.destroy
        render json: { message: "Photo deleted" }, status: :ok
      end

      private

      def set_post
        @post = Post.find(params[:post_id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Post not found" }, status: :not_found
      end

      def set_photo
        @photo = @post.photos.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Photo not found" }, status: :not_found
      end

      def photo_params
        params.require(:photo).permit(:image_url, :caption)
      end
    end
  end
end
