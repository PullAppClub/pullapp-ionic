import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Challenge,
  ChallengeLevel,
  HomePageChallenges,
} from '../../interfaces/challenge.interface';
import { SportType } from '../../enums/sport.enum';
import { ChallengeType } from '../../enums/challenge-type.enum';
import { User } from '../../../users/interfaces/user.interface';
import { fromEvent } from 'rxjs';
import { TabBarService } from '../../../../core/services/tab-bar/tab-bar.service';
import { ChallengeService } from '../../services/challenge/challenge.service';

@Component({
  selector: 'app-home-events',
  templateUrl: './home-events.component.html',
  styleUrls: ['./home-events.component.scss'],
})
export class HomeEventsComponent implements OnInit {
  public homePageChallenges?: HomePageChallenges;
  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent!: ElementRef;

  @ViewChild('rightScrollButton', { read: ElementRef })
  rightScrollButton!: ElementRef;

  private levelFilter!: ChallengeLevel;
  private sportFilter!: SportType;
  public showGlobalChallengesSpinner = false;

  constructor(
    public readonly tabBarService: TabBarService,
    private readonly challengeService: ChallengeService
  ) {}

  ngOnInit() {
    this.getHomePageChallenges();
  }

  ngAfterViewInit() {
    fromEvent(this.widgetsContent.nativeElement, 'scroll').subscribe({
      next: event => {
        // @ts-ignore
        if (event?.target['scrollLeft'] >= 170) {
          this.rightScrollButton.nativeElement.style.display = 'flex';
        } else {
          this.rightScrollButton.nativeElement.style.display = 'none';
        }
      },
    });
  }

  private getHomePageChallenges(): void {
    this.challengeService.getHomePageChallenges().subscribe({
      next: (challenges: HomePageChallenges) =>
        (this.homePageChallenges = challenges),
    });
  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft + 256,
      behavior: 'smooth',
    });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft - 256,
      behavior: 'smooth',
    });
  }

  public setLevelFilter(level: ChallengeLevel): void {
    this.levelFilter = level;
  }

  public setSportFilter(sport: SportType): void {
    this.sportFilter = sport;
  }
}
