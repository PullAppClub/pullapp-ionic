import { Component, OnInit } from '@angular/core';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';
import { TabBarPages } from '../../../../core/enums/pages.enum';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent implements OnInit {
  public tabBarPages = TabBarPages;
  private tabPagesArray = Object.values(TabBarPages);

  constructor(private readonly navigationHelper: NavigationHelper) {}

  ngOnInit() {}

  public openPage(page: TabBarPages): void {
    const currentPathIndex = this.tabPagesArray.indexOf(
      this.navigationHelper.getCurrentPath() as TabBarPages
    );
    const pageToNavigateIndex = this.tabPagesArray.indexOf(page);
    const animationDirection =
      currentPathIndex < pageToNavigateIndex ? 'forward' : 'back';

    this.navigationHelper.openPageWithoutHistory({
      route: page,
      options: { animationDirection },
    });
  }

  public isCurrentPage(page: TabBarPages): boolean {
    return this.navigationHelper.getCurrentPath().includes(page);
  }

  public isLoginOrProfilePage(): boolean {
    return (
      this.navigationHelper.getCurrentPath().includes(TabBarPages.Profile) ||
      this.navigationHelper.getCurrentPath().includes(TabBarPages.SignIn)
    );
  }

  public openActionPage(page: string): void {
    this.navigationHelper.openPage({
      route: page,
    });
  }
}
