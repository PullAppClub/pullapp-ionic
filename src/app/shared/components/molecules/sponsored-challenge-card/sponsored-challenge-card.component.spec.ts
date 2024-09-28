import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SponsoredChallengeCardComponent } from './sponsored-challenge-card.component';

describe('OfficialChallengeCardComponent', () => {
  let component: SponsoredChallengeCardComponent;
  let fixture: ComponentFixture<SponsoredChallengeCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SponsoredChallengeCardComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SponsoredChallengeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
