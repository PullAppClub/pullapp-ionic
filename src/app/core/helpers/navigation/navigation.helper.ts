import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavigationOptions } from '@ionic/angular/common/providers/nav-controller';

interface GoToParams {
  route: string;
  params?: Record<string, any>;
  options?: NavigationOptions;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationHelper {
  public history: string[] = [];

  constructor(
    private readonly navController: NavController,
    private readonly router: Router
  ) {}

  public openPage(params: GoToParams): void {
    this.navController
      .navigateForward(params.route, { queryParams: params.params })
      .then(() => this.history.push(params.route));
  }

  /**
   * Add a page to the history stack. Useful when routerLink is used.
   *
   * @example
   * <a
   *  routerLink="/user/forgot-password"
   *  (click)='navigationHelper.addPageToHistory("/user/forgot-password")'
   *  >{{ 'MODULES.USER.FORGOT_PASSWORD.FORGOT' | translate }}?</a>
   */
  public addPageToHistory(route: string): void {
    this.history.push(route);
  }

  public goBack(): void {
    if (this.history.length > 0) {
      this.navController.back();
      this.history.pop();
    }
  }

  public clearHistory(): void {
    this.history = [];
  }

  public getCurrentPath(): string {
    return this.router.url;
  }

  public openPageWithoutHistory(params: GoToParams): NavigationHelper {
    this.navController.navigateRoot(params.route, params.options);

    return this;
  }
}
