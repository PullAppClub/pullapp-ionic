import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { Role } from '../../../modules/users/enums/role.enum';
import { DecodedToken } from '../../types/auth.type';
import { CryptoHelper } from '../../helpers/crypto/crypto.helper';
import { catchError, first, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly cryptoHelper: CryptoHelper
  ) {}

  public getSessionToken(): Observable<string> {
    return this.firebaseService
      .getIdToken()
      .pipe(take(1))
      .pipe(switchMap(token => this.checkSessionToken(token)));
  }

  public observeParsedSessionToken(): Observable<DecodedToken | null> {
    return new Observable<DecodedToken | null>(subscriber => {
      this.firebaseService.observeIdToken().subscribe(value => {
        if (value) {
          subscriber.next(this.cryptoHelper.jwtDecode(value));
        } else {
          subscriber.next(null);
        }
      });
    });
  }

  public getParsedSessionToken(): Observable<DecodedToken> {
    return this.getSessionToken().pipe(
      map(token => this.cryptoHelper.jwtDecode(token))
    );
  }

  public checkRole(roles: Role[]): Observable<boolean> {
    return this.getParsedSessionToken().pipe(
      map(({ role }) => (role ? roles.includes(role) : false))
    );
  }

  private checkSessionToken(token: string | null): Observable<string> | string {
    return this.isSessionTokenValid(token)
      ? token
      : this.firebaseService.refreshIdToken();
  }

  private isSessionTokenValid(token: string | null): token is string {
    if (!token) {
      return false;
    }

    const jwt = this.cryptoHelper.jwtDecode(token);

    return new Date() >= new Date(jwt.exp * 1000);
  }
}
