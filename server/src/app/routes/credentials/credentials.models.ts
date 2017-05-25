import { ObjectID } from 'mongodb';
import { ROLE } from "../../core/shared/enums";

export interface IUserCredential {
  email: string;
  password: string;
}

export interface IUserInvitation {
  email: string;
  name: string;
  organizationId: ObjectID;
  role: ROLE;
}

export interface IUserRegistration {
  email: string;
  name: string;
  organizationId: ObjectID;
  password?: string;
  phone?: string;
  role?: ROLE;
}

export interface IUserConfirmation {
  id: ObjectID;
  hash: string;
}

export interface IUserActivation {
  id: ObjectID;
  email: string;
}