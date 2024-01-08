import { Component, OnInit } from '@angular/core';
import { Gender } from '../../../../core/enums/gender.enum';
import { UserProfile } from '../../types/profile.type';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  public gender = Gender;
  public profile?: UserProfile;
  public showSubmitSpinner: boolean = false;

  constructor(private readonly userProfileService: UserProfileService) {}

  ngOnInit() {
    this.setProfile();
  }

  private setProfile(): void {
    this.userProfileService.getProfile().subscribe({
      next: (profile: UserProfile) => (this.profile = profile),
    });
  }

  private updateProfile(): void {
    if (!this.profile) {
      return;
    }

    this.userProfileService
      .updateInfo(this.profile)
      .pipe(finalize(() => (this.showSubmitSpinner = false)))
      .subscribe({
        next: () => this.setProfile(),
      });
  }

  public execUpdateProfile = () => this.updateProfile();

  public setSelectedGenderTab(gender: Gender) {
    if (!this.profile) {
      return;
    }

    this.profile.gender = gender;
  }
}
