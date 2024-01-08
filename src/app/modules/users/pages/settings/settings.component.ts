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
import { Observable, combineLatest, finalize } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public uploadLabelId: string = 'uploadLabelId';
  public acceptedFileType: AcceptedFileType = AcceptedFileType.Image;
  public profile$: Observable<UserProfile> =
    this.userProfileService.getProfile();

  public showUploadSpinner: boolean = false;

  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper,
    public readonly navigationHelper: NavigationHelper,
    private readonly userAuthService: UserAuthService,
    private readonly toastService: ToastService,
    private readonly langService: LangService
  ) {}

  ngOnInit() {}

  public async logout(): Promise<void> {
    this.userAuthService.logout();
    this.navigationHelper.openPageWithoutHistory({ route: '/user/sign-in' });
  }

  public uploadFile(file: File): void {
    this.showUploadSpinner = true;

    const uploadAvatar$ = this.userProfileService.uploadAvatar(file);
    const title$ = this.langService.t(
      'MODULES.PROFILE.SETTINGS.AVATAR_CHANGED_TITLE'
    );
    const message$ = this.langService.t(
      'MODULES.PROFILE.SETTINGS.AVATAR_CHANGED_BODY'
    );

    combineLatest([uploadAvatar$, title$, message$])
      .pipe(finalize(() => (this.showUploadSpinner = false)))
      .subscribe({
        next: ([, title, message]) => {
          this.toastService.showToast({
            message,
            title,
            type: ToastType.Success,
          });
        },
      });
  }
}
