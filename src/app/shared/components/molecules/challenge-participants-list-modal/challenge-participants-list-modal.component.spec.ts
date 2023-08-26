import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChallengeParticipantsListModalComponent } from './challenge-participants-list-modal.component';

describe('ChallengeParticipantsListModalComponent', () => {
  let component: ChallengeParticipantsListModalComponent;
  let fixture: ComponentFixture<ChallengeParticipantsListModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChallengeParticipantsListModalComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeParticipantsListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
