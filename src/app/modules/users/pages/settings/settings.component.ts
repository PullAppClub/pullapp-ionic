import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';
import { UserAuthService } from '../../services/user-auth/user-auth.service';
import { AcceptedFileType } from '../../../../core/enums/file-type.enum';
import { UserProfile } from '../../types/profile.type';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { ToastType } from '../../../../core/enums/toast.enum';
import { LangService } from '../../../../core/services/lang/lang.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public uploadLabelId: string = 'uploadLabelId';
  public acceptedFileType: AcceptedFileType = AcceptedFileType.Image;
  public profile!: UserProfile;
  public showUploadSpinner: boolean = false;

  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper,
    public readonly navigationHelper: NavigationHelper,
    private readonly userAuthService: UserAuthService,
    private readonly toastService: ToastService,
    private readonly langService: LangService
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  public async logout(): Promise<void> {
    this.userAuthService.logout();
    this.navigationHelper.openPageWithoutHistory({ route: '/user/sign-in' });
  }

  private async getProfile(): Promise<void> {
    try {
      this.profile = await this.userProfileService.getProfile();
    } catch (e) {
      this.httpErrorHandlerHelper.handle(e);
    }
  }

  public async uploadFile(file: File): Promise<void> {
    try {
      this.showUploadSpinner = true;

      this.profile = await this.userProfileService.uploadAvatar(file);

      this.toastService.showToast({
        msg: await this.langService.t(
          'MODULES.PROFILE.SETTINGS.AVATAR_CHANGED_BODY'
        ),
        title: await this.langService.t(
          'MODULES.PROFILE.SETTINGS.AVATAR_CHANGED_TITLE'
        ),
        type: ToastType.Success,
      });

      this.showUploadSpinner = false;
    } catch (e) {
      this.showUploadSpinner = false;

      this.httpErrorHandlerHelper.handle(e);
    }
  }
}
