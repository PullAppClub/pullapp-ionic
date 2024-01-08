import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabBarPages } from './core/enums/pages.enum';
import { TabBarService } from './core/services/tab-bar/tab-bar.service';
import { LangService } from './core/services/lang/lang.service';
import { FirebaseService } from './core/services/firebase/firebase.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('tabBarContainer')
  public tapBar!: ElementRef;
  private lastScrollPosition = 0;
  private scrollAmount = 10;

  constructor(
    router: Router,
    public readonly tabBarService: TabBarService,
    langService: LangService,
    private readonly firebaseService: FirebaseService
  ) {
    this.showHideTabBar(router);

    langService.setupLang();
    this.setFirebaseToken();
  }

  private setFirebaseToken(): void {
    concat(
      this.firebaseService.requestPermission(),
      this.firebaseService.getFCMToken()
    ).subscribe();
  }

  /**
   * Decides in which page show or hide the tab bar.
   */
  private showHideTabBar(router: Router): void {
    router.events.subscribe(event => {
      const containsPage = Object.values(TabBarPages).some(page =>
        router.url.includes(page)
      );

      this.tabBarService.setShowTabBar(containsPage);
    });
  }

  public onContentScroll(event: any) {
    if (!this.tabBarService.showTabBar) {
      return;
    }

    const scrollPosition = event.detail.scrollTop;

    if (scrollPosition > this.lastScrollPosition + this.scrollAmount) {
      this.tapBar.nativeElement.style.display = 'none';
    } else if (scrollPosition < this.lastScrollPosition - this.scrollAmount) {
      this.tapBar.nativeElement.style.display = 'flex';
    }

    this.lastScrollPosition = scrollPosition;
  }
}
