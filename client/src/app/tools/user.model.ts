// export enum ROLE {
//   ADMIN = 'ADMIN',
//   INTERNO = 'INTERNO',
//   GOD = 'GOD',
//   PUBLICO = 'PUBLICO',
//   MESTRE = 'MESTRE',
//   PUBLIC = 'PUBLICO',
// }

// export enum STATUS {
//   PENDING = 'PENDING',
//   CONFIRMED = 'CONFIRMED',
//   ACTIVE = 'ACTIVE',
//   DISABLED = 'DISABLED',
//   CANCELED = 'CANCELED'
// }

export interface IUser {
  email: string;
  name: string;
  organizationId: string;
  roles: string[];
}
