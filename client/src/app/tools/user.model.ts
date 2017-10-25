// export enum ROLE {
//   ADMIN = 'ADMIN',
//   INTERNO = 'INTERNO',
//   GOD = 'GOD',
//   PUBLICO = 'PUBLICO',
//   MESTRE = 'MESTRE',
//   EXTERNO = 'EXTERNO',
// }

// export enum STATUS {
//   PENDING = 'PENDING', -> AMARILLO
//   CONFIRMED = 'CONFIRMED',
//   ACTIVE = 'ACTIVE', -> VERDE
//   DISABLED = 'DISABLED', -> DISABLED
//   CANCELED = 'CANCELED' -> GRIS
// }

export interface IUser {
  email: string;
  name: string;
  organizationId: string;
  roles: string[];
}
