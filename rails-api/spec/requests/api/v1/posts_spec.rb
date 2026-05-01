require "rails_helper"

RSpec.describe "Api::V1::Posts", type: :request do
  let!(:post1) do
    Post.create!(
      title: "First Post",
      post_text: "Hello world",
      scheduled_date: 2.days.from_now,
      status: "scheduled"
    )
  end

  let!(:post2) do
    Post.create!(
      title: "Second Post",
      post_text: "Another great post",
      scheduled_date: 5.days.from_now,
      status: "scheduled"
    )
  end

  describe "GET /api/v1/posts" do
    it "returns all posts" do
      get "/api/v1/posts"
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body.length).to eq(2)
    end

    it "includes photos in the response" do
      post1.photos.create!(image_url: "https://example.com/img.jpg", caption: "Test")
      get "/api/v1/posts"
      body = JSON.parse(response.body)
      post_data = body.find { |p| p["id"] == post1.id }
      expect(post_data["photos"]).to be_an(Array)
    end

    it "filters by status" do
      Post.create!(title: "Published", post_text: "text", scheduled_date: 1.day.ago, status: "published")
      get "/api/v1/posts?status=published"
      body = JSON.parse(response.body)
      expect(body.all? { |p| p["status"] == "published" }).to be true
    end
  end

  describe "GET /api/v1/posts/:id" do
    it "returns a single post" do
      get "/api/v1/posts/#{post1.id}"
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["title"]).to eq("First Post")
    end

    it "returns 404 for unknown post" do
      get "/api/v1/posts/99999"
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /api/v1/posts" do
    it "creates a post with valid params" do
      post "/api/v1/posts", params: {
        post: {
          title: "New Post",
          post_text: "Content here",
          scheduled_date: 3.days.from_now
        }
      }
      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)["title"]).to eq("New Post")
    end

    it "returns errors with invalid params" do
      post "/api/v1/posts", params: { post: { title: "" } }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)["errors"]).to be_present
    end
  end

  describe "PATCH /api/v1/posts/:id" do
    it "updates the post" do
      patch "/api/v1/posts/#{post1.id}", params: { post: { title: "Updated Title" } }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["title"]).to eq("Updated Title")
    end
  end

  describe "DELETE /api/v1/posts/:id" do
    it "deletes the post" do
      delete "/api/v1/posts/#{post1.id}"
      expect(response).to have_http_status(:ok)
      expect(Post.find_by(id: post1.id)).to be_nil
    end
  end
end
