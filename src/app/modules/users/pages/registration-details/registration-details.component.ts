import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Gender } from '../../../../core/enums/gender.enum';

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

  constructor() {}

  ngOnInit() {}

  public setSelectedGenderTab(gender: Gender) {
    this.selectedGenderTab = gender;
  }

  public async submit() {
    try {
      this.showSubmitSpinner = true;
    } catch (e) {
      this.showSubmitSpinner = false;
    }
  }
}
