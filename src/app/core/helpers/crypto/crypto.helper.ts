import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../../types/auth.type';

@Injectable({
  providedIn: 'root',
})
export class CryptoHelper {
  constructor() {}

  public jwtDecode(token: string): DecodedToken {
    return jwtDecode<DecodedToken>(token);
  }
}
