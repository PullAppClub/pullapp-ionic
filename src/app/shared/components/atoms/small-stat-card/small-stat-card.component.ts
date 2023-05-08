import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-stat-card',
  templateUrl: './small-stat-card.component.html',
  styleUrls: ['./small-stat-card.component.scss'],
})
export class SmallStatCardComponent implements OnInit {
  @Input()
  public title!: string;

  @Input()
  public value!: string;

  @Input()
  public icon!: string;

  constructor() {}

  ngOnInit() {}
}
