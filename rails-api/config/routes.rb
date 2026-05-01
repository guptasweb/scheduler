Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :show, :create, :update, :destroy] do
        resources :photos, only: [:index, :create, :destroy]
      end
    end
  end
end
