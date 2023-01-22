import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SportType } from '../../../modules/events/enums/sport.enum';

@Component({
  selector: 'app-select-sport',
  templateUrl: './select-sport.component.html',
  styleUrls: ['./select-sport.component.scss'],
})
export class SelectSportComponent implements OnInit {
  @Output()
  public selectedSportValueEmitter = new EventEmitter<SportType>();
  public sportTypeEnum = SportType;

  constructor() {}

  ngOnInit() {}

  public emitSelectedSport(sport: SportType) {
    this.selectedSportValueEmitter.emit(sport);
  }
}
