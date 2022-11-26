import firebase from 'firebase/compat';
import { SignInResult } from '@capacitor-firebase/authentication';
import { FirebaseAuthenticationPlugin } from '@capacitor-firebase/authentication/dist/esm/definitions';

export type FirebaseEmailPasswordProvider =
  FirebaseAuthenticationPlugin['signInWithEmailAndPassword'];

export type LoginProviderResponse =
  | Promise<SignInResult>
  | FirebaseEmailPasswordProvider
  | void;
