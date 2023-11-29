import { Component, OnInit } from '@angular/core';
import { UserIdentityService } from '../../services/user-identity/user-identity.service';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { ToastType } from '../../../../core/enums/toast.enum';
import { LangService } from '../../../../core/services/lang/lang.service';
import { catchError, combineLatest, take } from 'rxjs';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss'],
})
export class ChangeEmailComponent implements OnInit {
  public email: string | undefined;
  public showSaveSpinner = false;

  constructor(
    private readonly userIdentityService: UserIdentityService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper,
    private readonly toastService: ToastService,
    private readonly langService: LangService
  ) {}

  ngOnInit() {
    this.getEmail();
  }

  public changeEmail(): void {
    this.showSaveSpinner = true;

    const changeEmail$ = this.userIdentityService
      .changeEmail({
        email: this.email as string,
      })
      .pipe(catchError(e => this.httpErrorHandlerHelper.handle(e)));

    const title$ = this.langService.t('MODULES.PROFILE.EMAIL_CHANGED_TITLE');
    const message$ = this.langService.t('MODULES.PROFILE.EMAIL_CHANGED_BODY');

    combineLatest([changeEmail$, title$, message$])
      .subscribe({
        next: ([, title, message]) => {
          this.toastService.showToast({
            title,
            message,
            type: ToastType.Success,
          });
        },
        complete: () => (this.showSaveSpinner = false),
      })
      .unsubscribe();
  }

  public changeEmailCallback = () => this.changeEmail();

  public getEmail(): void {
    this.showSaveSpinner = true;

    this.userIdentityService
      .getEmail()
      .pipe(take(1))
      .subscribe({
        next: email => (this.email = email),
        error: e => this.httpErrorHandlerHelper.handle(e),
        complete: () => (this.showSaveSpinner = false),
      });
  }
}
