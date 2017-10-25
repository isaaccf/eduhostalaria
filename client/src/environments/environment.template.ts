// production
export const environment1 = {
  production: true,
  appName: 'Reservas',
  appTitle: 'Reservas Escolas',
  apiUrl: 'http://beta.reservas.agorabinaria.com/api/',
  assetsUrl: 'http://beta.reservas.agorabinaria.com/',
  secret: 'secret',
  godEmail: 'admin@agorabinaria.com'
};

// dev, remote server
export const environment2 = {
  production: false,
  appName: 'Reservas',
  appTitle: 'Reservas Escolas',
  apiUrl: 'http://beta.reservas.agorabinaria.com/api/',
  assetsUrl: 'http://localhost:4200/',
  secret: 'secret',
  godEmail: 'admin@agorabinaria.com'
};

// dev, local server
export const environment3 = {
  production: false,
  appName: 'Reservas',
  appTitle: 'Reservas Escolas',
  apiUrl: 'http://localhost:2000/api/',
  assetsUrl: 'http://localhost:4200/',
  secret: 'secret',
  godEmail: 'admin@agorabinaria.com'
};
