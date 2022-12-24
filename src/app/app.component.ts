import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabBarPages } from './core/enums/pages.enum';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('tabBarContainer')
  public tapBar!: ElementRef;

  public showTabBar: boolean = true;

  constructor(router: Router) {
    this.showHideTabBar(router);
  }

  /**
   * Decides in which page show or hide the tab bar.
   */
  private showHideTabBar(router: Router): void {
    router.events.subscribe(event => {
      this.showTabBar = Object.values(TabBarPages).some(page =>
        router.url.includes(page)
      );
    });
  }

  public onContentScroll(event: any) {
    if (event.detail.scrollTop >= 50) {
      this.tapBar.nativeElement.style.display = 'none';
    } else {
      this.tapBar.nativeElement.style.display = 'flex';
    }
  }
}
