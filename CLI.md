ng new rede-fp-hostalaria -dir client -is -p rh -st

ng g m core/layout --routing
ng g c core/layout/shell --export --flat -it 
ng g c core/layout/top-bar
ng g c core/layout/main-content

ng g m routes/home --routing
ng g c routes/home/home 

ng g m routes/organization --routing
ng g c routes/organization/organization
ng g c routes/organization/organization-events
ng g c routes/organization/organization-events-book

ng g m routes/bookings --routing
ng g c routes/bookings/bookins-edit 

ng g m routes/login --routing
ng g c routes/login/login 

ng g m routes/client --routing
ng g c routes/client/client
ng g c routes/client/client-bookings
ng g c routes/client/client-bookings-edit

ng g m routes/organizer --routing
ng g c routes/organizer/organizer
ng g c routes/organizer/organizer-events
ng g c routes/organizer/organizer-events-create
ng g c routes/organizer/organizer-events-edit

ng g m routes/admin --routing
ng g c routes/admin/admin
ng g c routes/admin/admin-organization
ng g c routes/admin/admin-users
ng g c routes/admin/admin-payments
ng g c routes/admin/admin-bookings

ng g m routes/usher --routing
ng g c routes/usher/usher
ng g c routes/usher/usher-events
ng g c routes/usher/usher-events-bookinks

