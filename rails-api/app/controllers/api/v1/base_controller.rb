module Api
  module V1
    # Namespace base for all v1 API controllers. Add shared hooks here
    # (auth, tenancy, instrumentation) as the API grows.
    class BaseController < ApplicationController
    end
  end
end
