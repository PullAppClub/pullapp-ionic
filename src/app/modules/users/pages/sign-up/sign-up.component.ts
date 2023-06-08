import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public showSignUpSpinner: boolean = false;
  public usernameIsValid!: boolean;
  public signUpForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(6)]),
    username: new FormControl('', [Validators.minLength(2)]),
  });

  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly userProfileService: UserProfileService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper,
    private readonly navigationHelper: NavigationHelper
  ) {}

  ngOnInit() {}

  public async signUp() {
    try {
      this.showSignUpSpinner = true;
      await this.checkUsername();

      if (this.signUpForm.invalid && !this.usernameIsValid) {
        this.showSignUpSpinner = false;

        return;
      }

      await this.createUser();
      await this.saveUsername();
      this.navigationHelper.openPage({ route: '/user/registration-details' });
    } catch (e) {
      this.httpErrorHandlerHelper.handle(e);

      this.showSignUpSpinner = false;
    }
  }

  private async saveUsername(): Promise<void> {
    await this.userProfileService.updateUsername(
      this.signUpForm.get('username')?.value as string
    );
  }

  private async createUser(): Promise<void> {
    await this.userAuthService.registerWithEmailAndPassword({
      email: this.signUpForm.get('email')?.value as string,
      password: this.signUpForm.get('password')?.value as string,
    });
  }

  public async checkUsername(): Promise<void> {
    try {
      const username = this.signUpForm.get('username')?.value as string;

      if (!username || username.length < 3 || username.length > 20) {
        return;
      }

      await this.userProfileService.checkUsername(username);

      this.usernameIsValid = true;
    } catch (e) {
      this.usernameIsValid = false;
      throw e;
    }
  }
}
