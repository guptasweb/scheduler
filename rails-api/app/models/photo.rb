class Photo < ApplicationRecord
  belongs_to :post

  validates :image_url, presence: true, format: {
    with: /\Ahttps?:\/\/.+/i,
    message: "must be a valid URL"
  }
  validates :caption, length: { maximum: 500 }, allow_blank: true
end
