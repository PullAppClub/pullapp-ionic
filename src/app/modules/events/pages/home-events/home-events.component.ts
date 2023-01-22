import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Challenge } from '../../interfaces/challenge.interface';
import { SportType } from '../../enums/sport.enum';
import { ChallengeType } from '../../enums/challenge-type.enum';
import { User } from '../../../users/interfaces/user.interface';
import { fromEvent } from 'rxjs';
import { TabBarService } from '../../../../core/services/tab-bar/tab-bar.service';
import { ChallengeLevel } from '../../enums/challenge-level.enum';

@Component({
  selector: 'app-home-events',
  templateUrl: './home-events.component.html',
  styleUrls: ['./home-events.component.scss'],
})
export class HomeEventsComponent implements OnInit {
  public challenges: Challenge[] = [];
  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent!: ElementRef;

  @ViewChild('rightScrollButton', { read: ElementRef })
  rightScrollButton!: ElementRef;

  private levelFilter!: ChallengeLevel;
  private sportFilter!: SportType;

  constructor(public readonly tabBarService: TabBarService) {
    // temp challenges
    this.challenges.push(
      {
        id: '1',
        title: 'Challenge 1',
        description: 'Challenge 1 description',
        participants: 4,
        sportType: SportType.Skating,
        challengeType: ChallengeType.Global,
        comments: 2,
        deadline: new Date(),
        createdAt: new Date(),
        thumbnail:
          'https://images.unsplash.com/photo-1589988020028-8e8b5b0b1b1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        video: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
        user: {} as User,
        level: {
          id: '1',
          levelName: 'Beginner',
          rewardMusclePoints: 10,
          requiredMusclePoints: 10,
        },
      },
      {
        id: '1',
        title: 'Challenge 1',
        description: 'Challenge 1 description',
        participants: 4,
        sportType: SportType.Skating,
        challengeType: ChallengeType.Global,
        comments: 2,
        deadline: new Date(),
        createdAt: new Date(),
        thumbnail:
          'https://images.unsplash.com/photo-1589988020028-8e8b5b0b1b1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        video: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
        user: {} as User,
        level: {
          id: '1',
          levelName: 'Beginner',
          rewardMusclePoints: 10,
          requiredMusclePoints: 10,
        },
      },
      {
        id: '1',
        title: 'Challenge 1',
        description: 'Challenge 1 description',
        participants: 4,
        sportType: SportType.Skating,
        challengeType: ChallengeType.Global,
        comments: 2,
        deadline: new Date(),
        createdAt: new Date(),
        thumbnail:
          'https://images.unsplash.com/photo-1589988020028-8e8b5b0b1b1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        video: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
        user: {} as User,
        level: {
          id: '1',
          levelName: 'Beginner',
          rewardMusclePoints: 10,
          requiredMusclePoints: 10,
        },
      }
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    fromEvent(this.widgetsContent.nativeElement, 'scroll').subscribe({
      next: event => {
        // @ts-ignore
        if (event?.target['scrollLeft'] >= 300) {
          this.rightScrollButton.nativeElement.style.display = 'flex';
        } else {
          this.rightScrollButton.nativeElement.style.display = 'none';
        }
      },
    });
  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft + 300,
      behavior: 'smooth',
    });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft - 300,
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
