require_relative "boot"
require "rails/all"

Bundler.require(*Rails.groups)

module SchedulerApi
  class Application < Rails::Application
    config.load_defaults 7.1
    config.api_only = true

    config.autoload_paths << root.join("app/serializers")
    config.eager_load_paths << root.join("app/serializers")

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins "http://localhost:5173"
        resource "*",
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head]
      end
    end
  end
end
