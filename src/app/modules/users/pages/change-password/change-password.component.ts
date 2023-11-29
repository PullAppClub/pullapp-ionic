import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';
import { UserAuthService } from '../../services/user-auth/user-auth.service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { LangService } from '../../../../core/services/lang/lang.service';
import { ToastType } from '../../../../core/enums/toast.enum';
import { catchError, combineLatest } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm = new FormGroup(
    {
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required,
      ]),
      repeatPassword: new FormControl('', [
        Validators.minLength(6),
        Validators.required,
      ]),
    },
    {
      validators: () => this.matchInputs('password', 'repeatPassword'),
    }
  );

  public showSpinner: boolean = false;

  constructor(
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper,
    private readonly userAuthService: UserAuthService,
    private readonly toastService: ToastService,
    private readonly langService: LangService
  ) {}

  ngOnInit() {}

  public changePassword(): void {
    const password = this.changePasswordForm?.get('password')?.value;
    const repeatedPassword =
      this.changePasswordForm?.get('repeatPassword')?.value;

    if (this.changePasswordForm.invalid && password !== repeatedPassword) {
      return;
    }

    this.showSpinner = true;

    const passwordChanged$ = this.userAuthService
      .changePassword(password as string)
      .pipe(catchError(e => this.httpErrorHandlerHelper.handle(e)));
    const title$ = this.langService.t('MODULES.PROFILE.PASSWORD_CHANGED_TITLE');
    const message$ = this.langService.t(
      'MODULES.PROFILE.PASSWORD_CHANGED_BODY'
    );

    combineLatest([passwordChanged$, title$, message$])
      .subscribe({
        next: ([_, title, message]) =>
          this.toastService.showToast({
            title,
            message,
            type: ToastType.Success,
          }),
        complete: () => {
          this.showSpinner = false;
        },
      })
      .unsubscribe();
  }

  public changePasswordCallback = () => this.changePassword();

  matchInputs(controlName1: string, controlName2: string): any {
    const password = this.changePasswordForm?.get('password')?.value;
    const repeatedPassword =
      this.changePasswordForm?.get('repeatPassword')?.value;

    if (password !== repeatedPassword) {
      this.changePasswordForm
        .get('repeatPassword')
        ?.setErrors({ mismatch: true });
    }
  }
}
