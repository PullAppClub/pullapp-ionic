import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
interface GoToParams {
  route: string;
  params?: object;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationHelper {
  public history: string[] = [];

  constructor(private readonly navController: NavController) {}

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
}
