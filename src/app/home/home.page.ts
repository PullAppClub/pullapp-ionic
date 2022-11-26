import { Component } from '@angular/core';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

  ngOnInit() {
    // FirebaseMessaging.getToken().then(token => console.log(token)).catch(err => console.log(err));
  }

  public async login() {
    try {
      const result = await FirebaseAuthentication.signInWithGoogle();
      console.log(result.user);
    } catch (e) {
      console.log(e);
    }
  }

  public async getToken() {
    const token = await FirebaseAuthentication.getIdToken();
    let awaitMe;
    console.log(token);
  }
}
