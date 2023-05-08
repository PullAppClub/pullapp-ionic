import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Tab {
  value: string;
  selected: boolean;
}

@Component({
  selector: 'app-animated-tabs',
  templateUrl: './animated-tabs.component.html',
  styleUrls: ['./animated-tabs.component.scss'],
})
export class AnimatedTabsComponent implements OnInit {
  @Input()
  public inputTabs: string[] = [];

  @Output()
  public selectedTab = new EventEmitter<string>();

  public tabs: Tab[] = [];

  constructor() {}

  ngOnInit() {
    this.tabs = this.inputTabs.map(tab => ({
      value: tab,
      selected: false,
    }));

    this.tabs[0].selected = true;
  }

  public clickHandler(tab: Tab) {
    this.tabs.forEach(tab => (tab.selected = false));
    this.selectedTab.emit(tab.value);

    tab.selected = true;
  }
}
