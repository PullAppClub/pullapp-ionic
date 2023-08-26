import { Component, Input, OnInit } from '@angular/core';
import {
  Challenge,
  ChallengeParticipant,
} from '../../../../modules/events/interfaces/challenge.interface';
import { ProfileBasicInfo } from '../../../../modules/users/interfaces/user.interface';

@Component({
  selector: 'app-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.scss'],
})
export class AvatarGroupComponent implements OnInit {
  @Input({ required: true })
  public challenge!: Challenge;
  public challengeParticipantsGroup: ProfileBasicInfo[] = [];

  constructor() {}

  ngOnInit(): void {
    this.challengeParticipantsGroup = this.assignFirstThreeParticipants(
      this.challenge.participants
    );
  }

  public assignFirstThreeParticipants(
    participants: ChallengeParticipant[]
  ): ProfileBasicInfo[] {
    return participants.slice(0, 3).map(participant => ({
      username: participant.user.username,
      userId: participant.user.userId,
      avatar: participant.user.avatar,
    }));
  }
}
