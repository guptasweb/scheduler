module Api
  module V1
    class PhotoSerializer
      def self.render(photo)
        {
          id: photo.id,
          post_id: photo.post_id,
          image_url: photo.image_url,
          caption: photo.caption,
          created_at: photo.created_at.iso8601
        }
      end
    end
  end
end
