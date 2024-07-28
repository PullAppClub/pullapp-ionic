import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stores-button',
  templateUrl: './stores-button.component.html',
  styleUrls: ['./stores-button.component.scss'],
})
export class StoresButtonComponent implements OnInit {
  @Input()
  public showPlayStore: boolean = false;

  @Input()
  public showAppStore: boolean = false;

  constructor() {}

  ngOnInit() {}
}
