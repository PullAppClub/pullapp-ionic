import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminChallengeRevisionComponent } from './admin-challenge-revision.component';

describe('AdminChallengeRevisionComponent', () => {
  let component: AdminChallengeRevisionComponent;
  let fixture: ComponentFixture<AdminChallengeRevisionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChallengeRevisionComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminChallengeRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
