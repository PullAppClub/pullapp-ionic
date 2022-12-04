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

  constructor(public readonly navigationHelper: NavigationHelper) {}

  ngOnInit() {}
}
