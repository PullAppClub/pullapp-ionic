import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SportType } from '../../enums/sport.enum';
import { ChallengeLevel } from '../../interfaces/challenge.interface';
import { ChallengeService } from '../../services/challenge/challenge.service';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';
import { AnimationOptions } from 'ngx-lottie';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.scss'],
})
export class CreateChallengeComponent implements OnInit {
  public createChallengeForm = new FormGroup({
    title: new FormControl('', [Validators.min(4), Validators.max(20)]),
    description: new FormControl('', [Validators.min(10), Validators.max(300)]),
  });
  private levelFilter!: ChallengeLevel;
  private sportFilter!: SportType;
  public video: File | undefined;
  public lottieOptions: AnimationOptions = {
    path: '/assets/lottie/warns.json',
  };

  @ViewChild('openModalBtn', { read: ElementRef })
  openModalBtn!: ElementRef;

  constructor(
    private readonly challengeService: ChallengeService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper,
    private readonly navigationHelper: NavigationHelper
  ) {}

  ngOnInit() {}

  public setLevelFilter(level: ChallengeLevel): void {
    this.levelFilter = level;
  }

  public handleVideo(event: any): void {
    this.video = event.target.files[0];
  }

  public setSportFilter(sport: SportType): void {
    this.sportFilter = sport;
  }

  public async createChallenge(): Promise<void> {
    try {
      if (this.createChallengeForm.invalid || !this.video) {
        return;
      }

      this.openModalBtn.nativeElement.click();

      await this.challengeService.createGlobalChallenge({
        title: this.createChallengeForm.get('title')?.value as string,
        description: this.createChallengeForm.get('description')
          ?.value as string,
        levelId: this.levelFilter.id,
        sportType: this.sportFilter,
        video: this.video,
      });
    } catch (e) {
      this.httpErrorHandlerHelper.handle(e);
    }
  }

  public closeModal(): void {
    this.openModalBtn.nativeElement.click();

    this.navigationHelper.goBack();
  }
}