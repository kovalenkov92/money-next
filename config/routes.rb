Rails.application.routes.draw do
  resources :country_flags, only: [:index]
  root to: 'pages#index'
  scope '(:locale)' do
  resources :currencies, only: [:index, :create, :update, :destroy, :show]

  resources :purses, only: [:index, :create, :update, :destroy, :show]

  resources :expenses, only: [:index, :create, :update, :destroy, :show]

  resources :categories, only: [:index, :create, :update, :destroy, :show]

  resources :charts do
    collection do
      get :pie_chart
      get :bar_chart
    end
  end

  resources :sessions, only: [:create] do
    collection do
      delete :destroy
      get :check
    end
  end

  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
