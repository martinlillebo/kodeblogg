Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'sider#forside'
  # root to: 'sider#forside' <--- Dette er langformen
  get 'hva-er-kodebloggen', to: 'sider#hva-er-kodebloggen'
  get 'artikler', to: 'sider#artikler'
end
