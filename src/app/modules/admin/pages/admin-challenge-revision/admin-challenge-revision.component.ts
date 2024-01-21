import { Component, OnInit } from '@angular/core';
import { Challenge } from '../../../events/interfaces/challenge.interface';
import { AdminChallengeService } from '../../services/admin-challenge/admin-challenge.service';
import { take } from 'rxjs';

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
    this.getChallenges();
  }

  public getChallenges(): void {
    this.adminChallengeService
      .getChallengesToApprove()
      .subscribe({
        next: (challenges: Challenge[]) => (this.challenges = challenges),
      });
  }

  public approve(challengeId: string): void {
    this.adminChallengeService
      .approveChallenge(challengeId)
      .pipe(take(1))
      .subscribe({
        next: () => this.removeChallengeFromList(challengeId),
      });
  }

  public reject(text: string): void {
    this.adminChallengeService
      .rejectChallenge(this.challengeToReject!.id, text)
      .pipe(take(1))
      .subscribe({
        next: () => this.removeChallengeFromList(this.challengeToReject!.id),
      });
  }

  private removeChallengeFromList(challengeId: string): void {
    this.challenges = this.challenges.filter(
      (challenge: Challenge) => challenge.id !== challengeId
    );
  }

  public setChallengeToReject(challenge: Challenge): void {
    this.challengeToReject = challenge;
  }
}
