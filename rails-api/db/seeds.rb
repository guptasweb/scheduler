# Seeds for development - sample scheduled posts
posts_data = [
  {
    title: "Product Launch Announcement",
    post_text: "Excited to announce our new product line dropping this Friday! Stay tuned for exclusive early access deals and behind-the-scenes content.",
    scheduled_date: 2.days.from_now,
    status: "scheduled"
  },
  {
    title: "Weekly Tip Tuesday",
    post_text: "Did you know you can save 30% on your monthly subscription by switching to annual billing? Here's how to make the switch in 3 easy steps.",
    scheduled_date: 4.days.from_now,
    status: "scheduled"
  },
  {
    title: "Community Spotlight",
    post_text: "Shoutout to our amazing community members who hit 10,000 hours of learning this month! Your dedication inspires us every day.",
    scheduled_date: 1.week.from_now,
    status: "scheduled"
  },
  {
    title: "Behind the Scenes",
    post_text: "Ever wonder what goes into building a feature? Our engineering team is sharing a day-in-the-life thread starting at 9am.",
    scheduled_date: 1.day.ago,
    status: "published"
  },
  {
    title: "Holiday Sale Teaser",
    post_text: "Something BIG is coming. Mark your calendars for next Monday. #SaleAlert",
    scheduled_date: 3.days.from_now,
    status: "scheduled"
  },
  {
    title: "Meet the Team Monday",
    post_text: "This week we're introducing Riley from Partner Success — favorite rituals, playlists for deep work, and one thing every new customer should do in week one.",
    scheduled_date: 5.days.from_now,
    status: "scheduled"
  },
  {
    title: "Webinar reminder: Scaling your content ops",
    post_text: "We're live tomorrow at 2pm ET. Agenda: tooling, approvals, and a live Q&A. Link in bio — grab your seat.",
    scheduled_date: 1.day.from_now,
    status: "scheduled"
  },
  {
    title: "ICYMI: Ship notes from March",
    post_text: "Dark mode polish, duplicate-post flow, bulk reschedule. Here's what landed and what's next on the roadmap thread.",
    scheduled_date: 3.days.ago,
    status: "published"
  },
  {
    title: "Spring campaign on hold",
    post_text: "Pausing outbound social for the seasonal push while we consolidate creative. Team will reschedule once assets land from brand.",
    scheduled_date: 6.days.from_now,
    status: "cancelled"
  },
  {
    title: "Friday quick poll",
    post_text: "Which format should we lean into next month — short tips, long threads, or video teasers? Vote in the replies.",
    scheduled_date: 8.days.from_now,
    status: "scheduled"
  }
]

titles_with_photos = [
  "Product Launch Announcement",
  "Community Spotlight",
  "Meet the Team Monday"
]

posts_data.each do |attrs|
  post = Post.find_or_initialize_by(title: attrs[:title])
  next unless post.new_record?

  post.assign_attributes(attrs)
  post.save!

  if titles_with_photos.include?(attrs[:title])
    post.photos.create!([
      {
        image_url: "https://picsum.photos/seed/#{post.id}a/800/600",
        caption: "#{attrs[:title]} - main visual"
      },
      {
        image_url: "https://picsum.photos/seed/#{post.id}b/800/600",
        caption: "#{attrs[:title]} - detail shot"
      }
    ])
  end
end

puts "Total #{Post.count} posts with #{Photo.count} photos."
