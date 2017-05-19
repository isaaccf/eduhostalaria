ng new rede-fp-hostalaria -dir client  -is -it -p rh -st
npm -- run ng g m core/layout --routing
ng g c core/layout/shell --flat --export
ng g c core/layout/top-bar
ng g c core/layout/main-content
