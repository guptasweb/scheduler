class Post < ApplicationRecord
  has_many :photos, dependent: :destroy

  STATUSES = %w[scheduled published cancelled].freeze

  validates :title, presence: true, length: { maximum: 255 }
  validates :post_text, presence: true
  validates :scheduled_date, presence: true
  validates :status, inclusion: { in: STATUSES }

  scope :upcoming, -> { where("scheduled_date > ?", Time.current).order(:scheduled_date) }
  scope :past, -> { where("scheduled_date <= ?", Time.current).order(scheduled_date: :desc) }
  scope :by_status, ->(status) { where(status: status) }

  def scheduled?
    status == "scheduled"
  end

  def published?
    status == "published"
  end

  def past_due?
    scheduled_date < Time.current && scheduled?
  end
end
