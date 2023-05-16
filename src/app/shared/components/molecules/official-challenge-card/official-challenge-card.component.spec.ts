import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfficialChallengeCardComponent } from './official-challenge-card.component';

describe('OfficialChallengeCardComponent', () => {
  let component: OfficialChallengeCardComponent;
  let fixture: ComponentFixture<OfficialChallengeCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OfficialChallengeCardComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(OfficialChallengeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
