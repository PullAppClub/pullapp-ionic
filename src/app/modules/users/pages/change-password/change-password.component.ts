import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';
import { UserAuthService } from '../../services/user-auth/user-auth.service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { LangService } from '../../../../core/services/lang/lang.service';
import { ToastType } from '../../../../core/enums/toast.enum';

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

  public async changePassword(): Promise<void> {
    try {
      this.showSpinner = true;

      const password = this.changePasswordForm?.get('password')?.value;
      const repeatedPassword =
        this.changePasswordForm?.get('repeatPassword')?.value;

      if (this.changePasswordForm.invalid && password !== repeatedPassword) {
        this.showSpinner = false;

        return;
      }

      await this.userAuthService.changePassword(password as string);

      this.showSpinner = false;

      this.toastService.showToast({
        title: await this.langService.t(
          'MODULES.PROFILE.PASSWORD_CHANGED_TITLE'
        ),
        msg: await this.langService.t('MODULES.PROFILE.PASSWORD_CHANGED_BODY'),
        type: ToastType.Success,
      });
    } catch (e) {
      this.httpErrorHandlerHelper.handle(e);

      this.showSpinner = false;
    }
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
