ng new rede-fp-hostalaria -dir client -is -p rh -st
npm -- run ng g m core/layout --routing
ng g c core/layout/shell --export --flat -it 
ng g c core/layout/top-bar
ng g c core/layout/main-content
ng g m routes/home --routing
ng g c routes/home/home 
ng g m routes/organization --routing
ng g c routes/organization/organization
ng g c routes/organization/events
ng g c routes/organization/events-book

