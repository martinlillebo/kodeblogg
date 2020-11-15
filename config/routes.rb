Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'sider#forside'
  # root to: 'sider#forside' <--- Dette er langformen
  get 'hva-er-kodebloggen', to: 'sider#hva-er-kodebloggen'
  get 'artikler', to: 'sider#artikler'
  get 'ortogonalitet', to: 'bloggposter#ortogonalitet' # -betegner-et-uavhengighetsforhold-mellom-to-programvarekomponenter
  get 'fordeler', to: 'bloggposter#fordeler' # -med å lagre info i plain text, og hvorfor mange bryr seg sånn om temaet
  get 'flappybird', to: 'sider#flappybird'
  get 'rammeverk', to: 'bloggposter#rammeverk'
end
