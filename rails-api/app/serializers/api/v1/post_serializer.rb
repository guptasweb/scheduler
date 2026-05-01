module Api
  module V1
    class PostSerializer
      def self.render(post)
        {
          id: post.id,
          title: post.title,
          post_text: post.post_text,
          scheduled_date: post.scheduled_date.iso8601,
          status: post.status,
          past_due: post.past_due?,
          photos: post.photos.map { |photo| ::Api::V1::PhotoSerializer.render(photo) },
          created_at: post.created_at.iso8601,
          updated_at: post.updated_at.iso8601
        }
      end

      def self.render_collection(posts)
        posts.map { |post| render(post) }
      end
    end
  end
end
