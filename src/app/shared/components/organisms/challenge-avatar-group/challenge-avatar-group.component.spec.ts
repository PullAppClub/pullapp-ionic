import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChallengeAvatarGroupComponent } from './challenge-avatar-group.component';

describe('ChallengeAvatarGroupComponent', () => {
  let component: ChallengeAvatarGroupComponent;
  let fixture: ComponentFixture<ChallengeAvatarGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChallengeAvatarGroupComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeAvatarGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
