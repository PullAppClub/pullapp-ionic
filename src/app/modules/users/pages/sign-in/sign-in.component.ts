import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';
import { UserAuthService } from '../../services/user-auth/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public lottieOptions: AnimationOptions = {
    path: '/assets/lottie/flex-arms.json',
  };

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl(''),
  });

  constructor(
    private readonly navigationHelper: NavigationHelper,
    private readonly userAuthService: UserAuthService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper
  ) {}

  ngOnInit() {}

  public async loginWithEmailAndPassword(): Promise<void> {
    try {
      if (this.loginForm.invalid) {
        return;
      }

      await this.userAuthService.loginWithEmailAndPassword({
        email: this.loginForm.get('email')?.value as string,
        password: this.loginForm.get('password')?.value as string,
      });

      this.navigationHelper
        .openPageWithoutHistory({ route: '/user/profile' })
        .clearHistory();
    } catch (e) {
      this.httpErrorHandlerHelper.handle(e);
    }
  }

  public async loginWithGoogle(): Promise<void> {}

  public openRegisterPage(): void {
    this.navigationHelper.openPage({ route: 'user/sign-up' });
  }
}
