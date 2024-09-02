import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChallengeType } from '../../../../modules/events/enums/challenge-type.enum';

@Component({
  selector: 'app-challenge-type-selector',
  templateUrl: './challenge-type-selector.component.html',
  styleUrls: ['./challenge-type-selector.component.scss'],
})
export class ChallengeTypeSelectorComponent implements OnInit {
  @Output()
  public selectedChallengeTypeEmitter = new EventEmitter<ChallengeType>();
  public challengeTypeEnum = ChallengeType;
  public selectedChallengeType?: ChallengeType;

  constructor() {}

  ngOnInit() {}

  public emitSelectedChallengeType(challengeType: ChallengeType) {
    this.selectedChallengeType = challengeType;
    this.selectedChallengeTypeEmitter.emit(challengeType);
  }

  public setChallengeTypeOnFirstLoad() {
    // setTimeout needed to hide the fast label changes on the UI
    setTimeout(() => {
      if (!this.selectedChallengeType) {
        this.emitSelectedChallengeType(ChallengeType.Global);
      }
    }, 300);
  }
}
