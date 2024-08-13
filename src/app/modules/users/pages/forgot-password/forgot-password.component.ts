import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth/user-auth.service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { LangService } from '../../../../core/services/lang/lang.service';
import { ToastType } from '../../../../core/enums/toast.enum';
import { finalize, take } from 'rxjs';
import { translate } from 'ol/transform';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public showResetPasswordSpinner: boolean = false;

  public forgotPasswordForm = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.minLength(3)]),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly toastService: ToastService,
    private readonly langService: LangService
  ) {}

  ngOnInit() {}

  public forgotPassword(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.showResetPasswordSpinner = true;

    this.userAuthService
      .sendPasswordResetEmail(
        this.forgotPasswordForm.get('email')?.value as string
      )
      .pipe(
        finalize(() => (this.showResetPasswordSpinner = false)),
        take(1)
      )
      .subscribe({
        next: () => {
          this.langService
            .t('MODULES.USER.FORGOT_PASSWORD.EMAIL_SENT')
            .subscribe(message => {
              this.toastService.showToast({
                message,
                title: 'Reset Password',
                type: ToastType.Success,
              });
            });
        },
        error: () => {
          this.langService
            .t('ERROR.SOMETHING_WENT_WRONG')
            .subscribe(message => {
              this.toastService.showToast({
                message,
                title: 'Error',
                type: ToastType.Error,
              });
            });
        },
      });
  }

  protected readonly translate = translate;
}
