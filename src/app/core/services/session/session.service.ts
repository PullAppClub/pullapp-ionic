import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private readonly firebaseService: FirebaseService) {}

  public async getSessionToken(): Promise<string> {
    return this.firebaseService.getIdToken();
  }
}
