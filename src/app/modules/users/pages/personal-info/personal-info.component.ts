import { Component, OnInit } from '@angular/core';
import { Gender } from '../../../../core/enums/gender.enum';
import { UserProfile } from '../../types/profile.type';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  public gender = Gender;
  public profile!: UserProfile;
  public showSubmitSpinner: boolean = false;

  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper
  ) {}

  ngOnInit() {
    this.setProfile();
  }

  private async setProfile(): Promise<void> {
    try {
      this.profile = await this.userProfileService.getProfile();
    } catch (e) {
      this.httpErrorHandlerHelper.handle(e);
    }
  }

  private async updateProfile(): Promise<void> {
    try {
      this.showSubmitSpinner = true;

      await this.userProfileService.updateInfo(this.profile);

      this.showSubmitSpinner = false;
    } catch (e) {
      this.showSubmitSpinner = false;

      this.httpErrorHandlerHelper.handle(e);
    }
  }

  public execUpdateProfile = () => this.updateProfile();

  public setSelectedGenderTab(gender: Gender) {
    this.profile.gender = gender;
  }
}
