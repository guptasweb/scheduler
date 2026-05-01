module Api
  module V1
    class PostsController < BaseController
      before_action :set_post, only: [:show, :update, :destroy]

      # GET /api/v1/posts
      def index
        @posts = Post.includes(:photos).all

        # Optional filters
        @posts = @posts.by_status(params[:status]) if params[:status].present?
        @posts = @posts.upcoming if params[:scope] == "upcoming"
        @posts = @posts.past if params[:scope] == "past"

        @posts = @posts.order(scheduled_date: :asc)

        render json: ::Api::V1::PostSerializer.render_collection(@posts), status: :ok
      end

      # GET /api/v1/posts/:id
      def show
        render json: ::Api::V1::PostSerializer.render(@post), status: :ok
      end

      # POST /api/v1/posts
      def create
        @post = Post.new(post_params)

        if @post.save
          render json: ::Api::V1::PostSerializer.render(@post), status: :created
        else
          render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/posts/:id
      def update
        if @post.update(post_params)
          render json: ::Api::V1::PostSerializer.render(@post), status: :ok
        else
          render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/posts/:id
      def destroy
        @post.destroy
        render json: { message: "Post deleted successfully" }, status: :ok
      end

      private

      def set_post
        @post = Post.includes(:photos).find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Post not found" }, status: :not_found
      end

      def post_params
        params.require(:post).permit(:title, :post_text, :scheduled_date, :status)
      end
    end
  end
end
