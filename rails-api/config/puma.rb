max_threads_count = ENV.fetch("RAILS_MAX_THREADS", 5)
min_threads_count = ENV.fetch("RAILS_MIN_THREADS", max_threads_count)
threads min_threads_count, max_threads_count

port ENV.fetch("PORT", 3000)
environment ENV.fetch("RAILS_ENV", "development")

# Puma plugin :tmp_restart can trigger phased restarts in development on file changes,
# which shells out to `bin/rails`. On Windows, that historically needs `bin/rails.bat`.
plugin :tmp_restart unless Gem.win_platform?

