import { Component, OnInit } from '@angular/core';
import { UserIdentityService } from '../../services/user-identity/user-identity.service';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { ToastType } from '../../../../core/enums/toast.enum';
import { LangService } from '../../../../core/services/lang/lang.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss'],
})
export class ChangeEmailComponent implements OnInit {
  public email?: string;
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

  public async changeEmail(): Promise<void> {
    try {
      this.showSaveSpinner = true;

      await this.userIdentityService.changeEmail({
        email: this.email as string,
      });

      this.showSaveSpinner = false;

      this.toastService.showToast({
        title: await this.langService.t('MODULES.PROFILE.EMAIL_CHANGED_TITLE'),
        msg: await this.langService.t('MODULES.PROFILE.EMAIL_CHANGED_BODY'),
        type: ToastType.Success,
      });
    } catch (error) {
      this.showSaveSpinner = false;

      this.httpErrorHandlerHelper.handle(error);
    }
  }

  public changeEmailCallback = () => this.changeEmail();

  public async getEmail(): Promise<void> {
    try {
      this.showSaveSpinner = true;

      this.email = await this.userIdentityService.getEmail();

      this.showSaveSpinner = false;
    } catch (error) {
      this.showSaveSpinner = false;

      this.httpErrorHandlerHelper.handle(error);
    }
  }
}
