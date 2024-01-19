import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';
import {
  concat,
  finalize,
  map,
  mergeMap,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public showSignUpSpinner: boolean = false;
  public isUsernameValid!: boolean;
  public signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.minLength(3)]),
      password: new FormControl('', [Validators.minLength(6)]),
      username: new FormControl('', [Validators.minLength(2)]),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly userProfileService: UserProfileService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper,
    private readonly navigationHelper: NavigationHelper
  ) {}

  ngOnInit() {}

  public signUp(): void {
    this.showSignUpSpinner = true;

    this.checkUsername()
      .pipe(
        mergeMap(() => this.userCreationHandler()),
        mergeMap(() => this.saveUsername()),
        finalize(() => (this.showSignUpSpinner = false))
      )
      .subscribe({
        next: () =>
          this.navigationHelper.openPage({
            route: '/user/registration-details',
          }),
        error: (e: Error) => this.httpErrorHandlerHelper.handle(e),
      })
  }

  private userCreationHandler(): Observable<void> {
    if (this.signUpForm.invalid && !this.isUsernameValid) {
      this.showSignUpSpinner = false;

      return throwError(() => new Error('Form is not valid'));
    }

    return concat(this.createUser());
  }

  private saveUsername(): Observable<void> {
    return this.userProfileService.updateUsername(
      this.signUpForm.get('username')?.value as string
    );
  }

  private createUser(): Observable<void> {
    return this.userAuthService.registerWithEmailAndPassword({
      email: this.signUpForm.get('email')?.value as string,
      password: this.signUpForm.get('password')?.value as string,
    });
  }

  private checkUsername(): Observable<void> {
    const username = this.signUpForm.get('username')?.value?.trim() as string;

    if (!username || username.length < 3 || username.length > 20) {
      return throwError(() => new Error('Username is not valid'));
    }

    return this.userProfileService
      .checkUsername(username)
      .pipe(tap(() => (this.isUsernameValid = true)));
  }
}
