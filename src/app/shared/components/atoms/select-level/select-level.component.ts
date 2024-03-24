import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChallengeLevel as ChallengeLevelEnum } from '../../../../modules/events/enums/challenge-level.enum';
import { ChallengeLevelService } from '../../../../modules/events/services/challenge-level/challenge-level.service';
import { ChallengeLevel } from '../../../../modules/events/interfaces/challenge.interface';

@Component({
  selector: 'app-select-level',
  templateUrl: './select-level.component.html',
  styleUrls: ['./select-level.component.scss'],
})
export class SelectLevelComponent implements OnInit {
  private _selectedLevel: number = 0;
  public emojiLevel: string = '🤪';
  public challengeLevels?: ChallengeLevel[];

  @Output()
  public selectedValueValueEmitter = new EventEmitter<ChallengeLevel>();

  public selectedChallengeLevel!: ChallengeLevel;

  constructor(private readonly challengeLevelService: ChallengeLevelService) {}

  set selectedLevel(level: number) {
    this._selectedLevel = level;
    this.setSelectedLevelType();
    this.setEmojiLevel();

    this.selectedValueValueEmitter.emit(this.selectedChallengeLevel);
  }

  get selectedLevel(): number {
    return this._selectedLevel;
  }

  ngOnInit() {
    this.getChallengeLevels();
  }

  public getChallengeLevels(): void {
    this.challengeLevelService.getAll().subscribe({
      next: (challengeLevels: ChallengeLevel[]) => {
        this.challengeLevels = challengeLevels;
        this.selectedChallengeLevel = this.challengeLevels[0];

        this.selectedValueValueEmitter.emit(this.selectedChallengeLevel);
      },
    });
  }

  private handleSelectedChallengeLevel(
    challengeLevelName: ChallengeLevelEnum
  ): void {
    this.selectedChallengeLevel = this.challengeLevels?.find(
      (challengeLevel: ChallengeLevel) =>
        challengeLevel.levelName === challengeLevelName.toUpperCase()
    )!;
  }

  private setSelectedLevelType(): void {
    switch (this._selectedLevel) {
      case 0:
        this.handleSelectedChallengeLevel(ChallengeLevelEnum.Amateur);
        break;
      case 10:
        this.handleSelectedChallengeLevel(ChallengeLevelEnum.Beginner);
        break;
      case 20:
        this.handleSelectedChallengeLevel(ChallengeLevelEnum.Rookie);
        break;
      case 30:
        this.handleSelectedChallengeLevel(ChallengeLevelEnum.Standard);
        break;
      case 40:
        this.handleSelectedChallengeLevel(ChallengeLevelEnum.Advanced);
        break;
      case 50:
        this.handleSelectedChallengeLevel(ChallengeLevelEnum.Master);
        break;
      case 60:
        this.handleSelectedChallengeLevel(ChallengeLevelEnum.Monster);
        break;
    }
  }

  private setEmojiLevel(): void {
    switch (this._selectedLevel) {
      case 0:
        this.emojiLevel = '🤪';
        break;
      case 10:
        this.emojiLevel = '😄';
        break;
      case 20:
        this.emojiLevel = '🙂';
        break;
      case 30:
        this.emojiLevel = '😐️';
        break;
      case 40:
        this.emojiLevel = '😤';
        break;
      case 50:
        this.emojiLevel = '😡';
        break;
      case 60:
        this.emojiLevel = '😈';
        break;
    }
  }
}
