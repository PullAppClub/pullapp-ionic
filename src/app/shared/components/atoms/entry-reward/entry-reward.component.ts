import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-reward',
  templateUrl: './entry-reward.component.html',
  styleUrls: ['./entry-reward.component.scss'],
})
export class EntryRewardComponent implements OnInit {
  @Input({ required: true })
  public requiredMuscleCoins!: number;

  @Input({ required: true })
  public rewardMuscleCoins!: number;

  constructor() {}

  ngOnInit() {}
}
