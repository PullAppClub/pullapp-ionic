import { Component, OnInit } from '@angular/core';
import { Challenge } from '../../../events/interfaces/challenge.interface';
import { AdminChallengeService } from '../../services/admin-challenge/admin-challenge.service';

@Component({
  selector: 'app-admin-challenge-revision',
  templateUrl: './admin-challenge-revision.component.html',
  styleUrls: ['./admin-challenge-revision.component.scss'],
})
export class AdminChallengeRevisionComponent implements OnInit {
  public challenges: Challenge[] = [];
  public rejectChallengeModalLabelId = 'rejectChallengeModalLabelId';
  private challengeToReject: Challenge | null = null;

  constructor(private readonly adminChallengeService: AdminChallengeService) {}

  ngOnInit() {
    this.getChallengesToApprove();
  }

  private async getChallengesToApprove(): Promise<void> {
    try {
      this.challenges =
        await this.adminChallengeService.getChallengesToApprove();
    } catch (error) {
      console.log(error);
    }
  }

  public async approve(challengeId: string): Promise<void> {
    try {
      await this.adminChallengeService.approveChallenge(challengeId);
    } catch (error) {
      console.log(error);
    }
  }

  public async reject(text: string): Promise<void> {
    try {
      console.log(this.challengeToReject?.id, text);
    } catch (error) {
      console.log(error);
    }
  }

  public setChallengeToReject(challenge: Challenge): void {
    this.challengeToReject = challenge;
  }
}
