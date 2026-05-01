require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = false
  config.eager_load = false

  config.consider_all_requests_local = true

  config.cache_store = :null_store

  config.active_support.deprecation = :stderr
  config.active_support.disallowed_deprecation = :raise
  config.active_support.disallowed_deprecation_warnings = []

  if config.respond_to?(:active_record)
    config.active_record.migration_error = :page_load
  end

  config.log_level = :warn
end

