import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../../modules/events/interfaces/challenge.interface';
import { TabBarService } from '../../../../core/services/tab-bar/tab-bar.service';

@Component({
  selector: 'app-challenge-avatar-group',
  templateUrl: './challenge-avatar-group.component.html',
  styleUrls: ['./challenge-avatar-group.component.scss'],
})
export class ChallengeAvatarGroupComponent implements OnInit {
  @Input({ required: true })
  public challenge: Challenge | undefined;

  @Input({ required: true })
  public forLabelId: string = 'challenge';

  constructor(public readonly tabBarService: TabBarService) {}

  ngOnInit() {}
}
