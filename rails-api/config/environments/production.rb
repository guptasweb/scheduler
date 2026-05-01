require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = false
  config.eager_load = true

  config.consider_all_requests_local = false

  config.cache_store = :memory_store

  config.active_support.deprecation = :notify
  config.active_support.disallowed_deprecation = :raise
  config.active_support.disallowed_deprecation_warnings = []

  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", "info")
end

