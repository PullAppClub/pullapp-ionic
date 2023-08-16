import firebase from 'firebase/compat';
import { Role } from '../../modules/users/enums/role.enum';

export type FirebaseEmailPasswordProvider = (
  email: string,
  password: string
) => Promise<firebase.auth.UserCredential>;

export type LoginProviderResponse =
  | Promise<firebase.auth.UserCredential>
  | FirebaseEmailPasswordProvider
  | void;

export interface DecodedToken {
  aud: string;
  auth_time: number;
  email?: string;
  email_verified?: boolean;
  exp: number;
  firebase: {
    identities: {
      [key: string]: any;
    };
    sign_in_provider: string;
    sign_in_second_factor?: string;
    second_factor_identifier?: string;
    tenant?: string;
    [key: string]: any;
  };
  iat: number;
  iss: string;
  phone_number?: string;
  picture?: string;
  sub: string;
  role?: Role;
  uid: string;
  userId?: string;
  deviceId?: string;
  deviceToken?: string;
}
