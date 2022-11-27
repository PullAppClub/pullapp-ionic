import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public showSignUpSpinner: boolean = false;

  constructor() {}

  ngOnInit() {}

  public async signUp() {
    try {
      this.showSignUpSpinner = true;
    } catch (e) {
      this.showSignUpSpinner = false;
    }
  }
}
