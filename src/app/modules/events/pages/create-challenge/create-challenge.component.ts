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
import { CurrencyType } from '../../../../core/enums/currency-type.enum';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.scss'],
})
export class CreateChallengeComponent implements OnInit {
  public challengeType: ChallengeType = ChallengeType.Global;

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
    sponsoredBy: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    sponsorUrl: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
  });
  public level!: ChallengeLevel;
  public sportFilter!: SportType;
  public video: File | undefined;
  public lottieOptions: AnimationOptions = {
    path: '/assets/lottie/warns.json',
  };

  public challengeTypeEnum = ChallengeType;
  public challengePricing?: ChallengePricing;
  private selectedCurrency?: CurrencyType;
  public showPaymentUploadingSpinner = false;
  public paymentLink?: string;
  public purchaseId?: string;
  public showCloseButton = false;

  @ViewChild('openModalBtn', { read: ElementRef })
  openModalBtn!: ElementRef;

  @ViewChild('tonStarsPaymentModal', { read: ElementRef })
  openTonStarsPaymentModal!: ElementRef;

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

  public setCurrency(currencyType: CurrencyType): void {
    this.selectedCurrency = currencyType;
  }

  public handleChallengeCreation(): void {
    if (this.checkCreationConstraints()) {
      return;
    }

    if (this.challengeType === ChallengeType.Global) {
      this.createGlobalChallenge();
    }

    if (this.challengeType === ChallengeType.Sponsored) {
      this.createSponsoredChallenge();
    }
  }

  public createGlobalChallenge(): void {
    this.openModalBtn.nativeElement.click();

    const createChallenge$ = this.challengeService.createGlobalChallenge({
      title: this.createChallengeForm.get('title')?.value as string,
      description: this.createChallengeForm.get('description')?.value as string,
      levelId: this.level.id,
      sportType: this.sportFilter,
      video: this.video as File,
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

  private createSponsoredChallenge(): void {
    if (!this.challengePricing || !this.selectedCurrency) {
      return;
    }

    this.showPaymentUploadingSpinner = true;

    this.openTonStarsPaymentModal.nativeElement.click();

    const createChallenge$ = this.challengeService.createSponsoredChallenge({
      title: this.createChallengeForm.get('title')?.value as string,
      description: this.createChallengeForm.get('description')?.value as string,
      levelId: this.level.id,
      sportType: this.sportFilter,
      video: this.video as File,
      sponsoredBy: this.createChallengeForm.get('sponsoredBy')?.value as string,
      sponsorUrl: this.createChallengeForm.get('sponsorUrl')?.value as string,
      currencyType: this.selectedCurrency,
    });

    createChallenge$
      .pipe(finalize(() => (this.showPaymentUploadingSpinner = false)))
      .subscribe({
        next: ({ paymentLink, purchaseId }) => {
          this.paymentLink = paymentLink;
          this.purchaseId = purchaseId;
        },
      });
  }

  private checkCreationConstraints(): boolean {
    return (
      this.createChallengeForm.invalid ||
      !this.video ||
      !this.sportFilter ||
      !this.level
    );
  }

  public closeModal(): void {
    this.openModalBtn.nativeElement.click();

    this.navigationHelper.openPageWithoutHistory({
      route: '/events/home',
    });
  }

  /**
   * Shows close modal after a user has clicked on the pay button
   */
  public setShowCloseButton(value?: boolean): void {
    setTimeout(() => {
      this.showCloseButton = value ?? true;
    }, 500);
  }
}
