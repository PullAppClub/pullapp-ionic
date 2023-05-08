import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChallengeLevel } from '../../../../modules/events/enums/challenge-level.enum';

@Component({
  selector: 'app-select-level',
  templateUrl: './select-level.component.html',
  styleUrls: ['./select-level.component.scss'],
})
export class SelectLevelComponent implements OnInit {
  private _selectedLevel: number = 0;
  public selectedLevelType: keyof typeof ChallengeLevel = 'Amateur';
  public emojiLevel: string = '🤪';

  @Output()
  public selectedValueValueEmitter = new EventEmitter<ChallengeLevel>();

  set selectedLevel(level: number) {
    this._selectedLevel = level;
    this.setSelectedLevelType();
    this.setEmojiLevel();
    this.selectedValueValueEmitter.emit(ChallengeLevel[this.selectedLevelType]);
  }

  get selectedLevel(): number {
    return this._selectedLevel;
  }

  ngOnInit() {}

  private setSelectedLevelType(): void {
    switch (this._selectedLevel) {
      case 0:
        this.selectedLevelType = 'Amateur';
        break;
      case 10:
        this.selectedLevelType = 'Beginner';
        break;
      case 20:
        this.selectedLevelType = 'Rookie';
        break;
      case 30:
        this.selectedLevelType = 'Standard';
        break;
      case 40:
        this.selectedLevelType = 'Advanced';
        break;
      case 50:
        this.selectedLevelType = 'Master';
        break;
      case 60:
        this.selectedLevelType = 'Monster';
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
