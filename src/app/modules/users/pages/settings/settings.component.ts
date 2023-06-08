import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';
import { UserAuthService } from '../../services/user-auth/user-auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper,
    public readonly navigationHelper: NavigationHelper,
    private readonly userAuthService: UserAuthService
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
      await this.userProfileService.getProfile();
    } catch (e) {
      this.httpErrorHandlerHelper.handle(e);
    }
  }
}
