import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { Role } from '../../../modules/users/enums/role.enum';
import { DecodedToken } from '../../types/auth.type';
import { CryptoHelper } from '../../helpers/crypto/crypto.helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly cryptoHelper: CryptoHelper
  ) {}

  public async getSessionToken(): Promise<string> {
    return this.firebaseService.getIdToken();
  }

  public observeSessionToken(): Observable<string | null> {
    return this.firebaseService.observeIdToken();
  }

  public async getParsedSessionToken(): Promise<DecodedToken> {
    return this.cryptoHelper.jwtDecode(await this.getSessionToken());
  }

  public async checkRole(roles: Role[]): Promise<boolean> {
    const { role } = await this.getParsedSessionToken();

    if (!role) {
      return false;
    }

    return roles.includes(role);
  }
}
