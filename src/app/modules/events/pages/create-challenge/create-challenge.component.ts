import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SportType } from '../../enums/sport.enum';
import { ChallengeLevel } from '../../interfaces/challenge.interface';
import { ChallengeService } from '../../services/challenge/challenge.service';
import { AnimationOptions } from 'ngx-lottie';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';
import { ToastType } from '../../../../core/enums/toast.enum';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { LangService } from '../../../../core/services/lang/lang.service';
import { ChallengeType } from '../../enums/challenge-type.enum';
import { ChallengePaymentService } from '../../services/challenge-payment/challenge-payment.service';
import { ChallengePricing } from '../../interfaces/challenge-payment.interface';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.scss'],
})
export class CreateChallengeComponent implements OnInit {
  public createChallengeForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(300),
    ]),
  });
  public level!: ChallengeLevel;
  public sportFilter!: SportType;
  public video: File | undefined;
  public lottieOptions: AnimationOptions = {
    path: '/assets/lottie/warns.json',
  };

  public challengeType: ChallengeType = ChallengeType.Global;
  public challengeTypeEnum = ChallengeType;
  public challengePricing?: ChallengePricing;

  @ViewChild('openModalBtn', { read: ElementRef })
  openModalBtn!: ElementRef;

  constructor(
    private readonly challengeService: ChallengeService,
    private readonly navigationHelper: NavigationHelper,
    private readonly toastService: ToastService,
    private readonly langService: LangService,
    private readonly challengePaymentService: ChallengePaymentService
  ) {}

  ngOnInit() {}

  public setLevel(level: ChallengeLevel): void {
    this.level = level;
  }

  public handleVideo(video: File): void {
    this.video = video;
  }

  public setSportFilter(sport: SportType): void {
    this.sportFilter = sport;
  }

  public setChallengeType(challengeType: ChallengeType): void {
    this.challengeType = challengeType;

    if (challengeType === ChallengeType.Global && !this.challengePricing) {
      this.challengePaymentService
        .getSponsoredChallengePricing()
        .subscribe(pricing => (this.challengePricing = pricing));
    }
  }

  public createChallenge(): void {
    if (
      this.createChallengeForm.invalid ||
      !this.video ||
      !this.sportFilter ||
      !this.level
    ) {
      return;
    }

    this.openModalBtn.nativeElement.click();

    const createChallenge$ = this.challengeService.createGlobalChallenge({
      title: this.createChallengeForm.get('title')?.value as string,
      description: this.createChallengeForm.get('description')?.value as string,
      levelId: this.level.id,
      sportType: this.sportFilter,
      video: this.video,
    });

    createChallenge$.subscribe({
      next: ({ message }) =>
        this.toastService.showToast({
          message,
          type: ToastType.Success,
          title: 'Challenge',
        }),
    });
  }

  public closeModal(): void {
    this.openModalBtn.nativeElement.click();

    this.navigationHelper.openPageWithoutHistory({
      route: '/events/home',
    });
  }
}
