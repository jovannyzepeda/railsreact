Rails.application.routes.draw do
  resources :images
  resources :posts
  devise_for :users, controllers: {
  	sessions: 'authentication/sessions',
  	registrations: 'authentication/registrations'
  }
  
  #rutas exclusivas para cuando un usuario ha iniciado sesion
  authenticated :user do
  	root 'main#dashboard', as: :authenticated_root
  end
  root 'main#home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
