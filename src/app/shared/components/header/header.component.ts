import { Component, Input, OnInit } from '@angular/core';
import { NavigationHelper } from '../../../core/helpers/navigation/navigation.helper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  public title: string | undefined;

  @Input()
  public showMenu: boolean = false;

  @Input()
  public showProfilePreferences: boolean = false;

  constructor(public readonly navigationHelper: NavigationHelper) {}

  ngOnInit() {}

  public onSettingsClick(): void {
    this.navigationHelper.openPage({ route: '/user/settings' });
  }
}
