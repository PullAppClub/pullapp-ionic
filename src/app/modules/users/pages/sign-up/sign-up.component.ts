import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public showSignUpSpinner: boolean = false;
  public signUpForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(6)]),
    username: new FormControl('', [Validators.minLength(2)]),
  });

  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper
  ) {}

  ngOnInit() {}

  public async signUp() {
    try {
      // this.showSignUpSpinner = true;
      if (this.signUpForm.invalid) {
        this.showSignUpSpinner = false;

        return;
      }

      await this.createUser();
    } catch (e) {
      this.httpErrorHandlerHelper.handle(e);

      this.showSignUpSpinner = false;
    }
  }

  private async createUser(): Promise<void> {
    await this.userAuthService.registerWithEmailAndPassword({
      email: this.signUpForm.get('email')?.value as string,
      password: this.signUpForm.get('password')?.value as string,
    });
  }
}
