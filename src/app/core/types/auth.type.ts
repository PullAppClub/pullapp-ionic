import firebase from 'firebase/compat';

export type FirebaseEmailPasswordProvider = (
  email: string,
  password: string
) => Promise<firebase.auth.UserCredential>;

export type LoginProviderResponse =
  | Promise<firebase.auth.UserCredential>
  | FirebaseEmailPasswordProvider
  | void;
