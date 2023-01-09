import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';
import { Router } from '@angular/router';

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
      .navigateForward(params.route)
      .then(() => this.history.push(params.route));
  }

  public goBack(): void {
    if (this.history.length > 0) {
      this.navController.back();
      this.history.pop();
    }
  }

  public getCurrentPath(): string {
    return this.router.url;
  }

  public openPageWithoutHistory(params: GoToParams): void {
    this.navController.navigateRoot(params.route, params.options);
  }
}
