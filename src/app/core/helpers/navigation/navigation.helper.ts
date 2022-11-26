import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
interface GoToParams {
  route: string;
  params?: object;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationHelper {
  constructor(
    private readonly router: Router,
    private readonly location: Location
  ) {}

  public goToByUrl(params: GoToParams): void {
    this.router.navigateByUrl(params.route);
  }

  public goBack(): void {
    this.location.back();
  }

  public goToLink(url: string): void {
    window.open(url, '_blank');
  }
}
