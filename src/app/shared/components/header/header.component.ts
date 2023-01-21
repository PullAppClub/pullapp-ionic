import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NavigationHelper } from '../../../core/helpers/navigation/navigation.helper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input()
  public title: string | undefined;

  @Input()
  public showMenu: boolean = false;

  @Input()
  public showProfilePreferences: boolean = false;

  /**
   * Needs to show the right button in the header, that has to open a modal menu.
   */
  @Input()
  public rightMenuLabelForId!: string;

  constructor(public readonly navigationHelper: NavigationHelper) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  public onSettingsClick(): void {
    this.navigationHelper.openPage({ route: '/user/settings' });
  }
}
