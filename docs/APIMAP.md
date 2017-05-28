# [Home](http://api.rfph.com/ "API de Resevas Rede FP Hostalaria")

# [Users](http://api.rfph.com/credentials "Credentials")
````javascript

````

# [Users](http://api.rfph.com/users "Usuarios")
```javascript
{
  _id:'3452sdfgwq435',
  name:'Kevin Gameiro',
  password: 'gfasr154r',
  email:'kevin@loquesea.com',
  roles: ['admin','client','god','organizer','public','usher'],
  organizationId: '32r2rfw4rqw3df',
  status: 'pending'|'active'|'disabled'
}
```
# [Organizations](http://api.rfph.com/organizations "Centros")
```javascript
{
  _id:'3452sdfgwq435',
  name:'CEIP Paseo das Pontes',
  email:'info@paseo.xunta.edu',
  phone : '987654321',
  url : 'http://edu.xunta.gal',
  address:{},
  description: '',
  image:'',
  standardPrice: 159,
  reducedPrice:15,
}
```
# [Events](http://api.rfph.com/events "Ofertas")
```javascript
{
  _id:'3452sdfgwq435',
  organizerId :'213451234fasdf',
  created: '',
  name:'',
  description: '',
  image:'',
  startDate:'',
  endDate:'',
  location:'',
  price: 158.24,
  capacity:100,
  shift:1,
  items:[''],
}
```
# [Bookings](http://api.rfph.com/bookings "Reservas")
```javascript
{
  _id:'3452sdfgwq435',
  eventId: 'sdfq234524rae',
  clientId: 'sdfa1245213',
  status : 'pending'|'active'|'done'|'canceled'|'denied',
  total: 1,
  amount: 158.24,
  observations: '',
  hash: 'dfgas1dfgasdfg2sdfgsd4fgsdfgsdfg'
}
```
# [Payments](http://api.rfph.com/payments "Pagos")
```javascript
{
  _id:'3452sdfgwq435',
  bookingId: 'sdfq234524rae',
  status : 'pending'|'paid'|'canceled',
  amount: 58.24,
  method: 'card'|'cash'|'coupon'|'transfer',
  observations: '',
}
```