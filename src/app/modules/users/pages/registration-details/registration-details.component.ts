import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Gender } from '../../../../core/enums/gender.enum';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.scss'],
})
export class RegistrationDetailsComponent implements OnInit {
  public gender = Gender;
  public selectedGenderTab = Gender.Male;
  public height = 130;
  public weight = 60;
  public birthday: Date | undefined;
  public showSubmitSpinner: boolean = false;

  constructor(
    private readonly profileService: UserProfileService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper,
    private readonly navigationHelper: NavigationHelper
  ) {}

  ngOnInit() {}

  public setSelectedGenderTab(gender: Gender) {
    this.selectedGenderTab = gender;
  }

  public async submit() {
    try {
      if (!this.birthday) {
        return;
      }

      this.showSubmitSpinner = true;

      await this.profileService.updateInfo({
        height: this.height,
        weight: this.weight,
        birthday: this.birthday as Date,
        gender: this.selectedGenderTab,
      });

      this.showSubmitSpinner = true;

      this.navigationHelper.openPageWithoutHistory({
        route: '/user/profile',
      });
    } catch (e) {
      this.showSubmitSpinner = false;

      this.httpErrorHandlerHelper.handle(e);
    }
  }
}
