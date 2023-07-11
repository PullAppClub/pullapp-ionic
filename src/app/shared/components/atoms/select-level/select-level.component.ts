import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChallengeLevel as ChallengeLevelEnum } from '../../../../modules/events/enums/challenge-level.enum';
import { ChallengeLevelService } from '../../../../modules/events/services/challenge-level/challenge-level.service';
import { ChallengeLevel } from '../../../../modules/events/interfaces/challenge.interface';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';

@Component({
  selector: 'app-select-level',
  templateUrl: './select-level.component.html',
  styleUrls: ['./select-level.component.scss'],
})
export class SelectLevelComponent implements OnInit {
  private _selectedLevel: number = 0;
  public selectedLevelType: keyof typeof ChallengeLevelEnum = 'Amateur';
  public emojiLevel: string = '🤪';
  public challengeLevels!: ChallengeLevel[];

  @Output()
  public selectedValueValueEmitter = new EventEmitter<ChallengeLevel>();

  public selectedChallengeLevel!: ChallengeLevel;

  constructor(
    private readonly challengeLevelService: ChallengeLevelService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper
  ) {}

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

  public async getChallengeLevels(): Promise<void> {
    try {
      this.challengeLevels = await this.challengeLevelService.getAll();

      this.selectedChallengeLevel = this.challengeLevels[0];
    } catch (error) {
      this.httpErrorHandlerHelper.handle(error);
    }
  }

  private handleSelectedChallengeLevel(
    challengeLevelName: ChallengeLevelEnum
  ): void {
    this.selectedChallengeLevel = this.challengeLevels.find(
      (challengeLevel: ChallengeLevel) =>
        challengeLevel.levelName === challengeLevelName.toUpperCase()
    )!;
  }

  private setSelectedLevelType(): void {
    switch (this._selectedLevel) {
      case 0:
        this.selectedLevelType = 'Amateur';
        this.handleSelectedChallengeLevel(ChallengeLevelEnum.Amateur);
        break;
      case 10:
        this.selectedLevelType = 'Beginner';
        this.handleSelectedChallengeLevel(ChallengeLevelEnum.Beginner);
        break;
      case 20:
        this.selectedLevelType = 'Rookie';
        this.handleSelectedChallengeLevel(ChallengeLevelEnum.Rookie);
        break;
      case 30:
        this.selectedLevelType = 'Standard';
        this.handleSelectedChallengeLevel(ChallengeLevelEnum.Standard);
        break;
      case 40:
        this.selectedLevelType = 'Advanced';
        this.handleSelectedChallengeLevel(ChallengeLevelEnum.Advanced);
        break;
      case 50:
        this.selectedLevelType = 'Master';
        this.handleSelectedChallengeLevel(ChallengeLevelEnum.Master);
        break;
      case 60:
        this.selectedLevelType = 'Monster';
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
