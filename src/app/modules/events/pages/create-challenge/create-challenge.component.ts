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
  private level!: ChallengeLevel;
  private sportFilter!: SportType;
  public video: File | undefined;
  public lottieOptions: AnimationOptions = {
    path: '/assets/lottie/warns.json',
  };

  @ViewChild('openModalBtn', { read: ElementRef })
  openModalBtn!: ElementRef;

  constructor(
    private readonly challengeService: ChallengeService,
    private readonly navigationHelper: NavigationHelper,
    private readonly toastService: ToastService,
    private readonly langService: LangService
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

  public createChallenge(): void {
    if (this.createChallengeForm.invalid || !this.video) {
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
