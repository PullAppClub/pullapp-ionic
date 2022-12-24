import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public lottieOptions: AnimationOptions = {
    path: '/assets/lottie/flex-arms.json',
  };

  constructor(private readonly navigationHelper: NavigationHelper) {}

  ngOnInit() {}

  public async loginWithEmailAndPassword(): Promise<void> {}

  public async loginWithGoogle(): Promise<void> {}

  public openRegisterPage(): void {
    this.navigationHelper.openPage({ route: 'users/sign-up' });
  }
}
