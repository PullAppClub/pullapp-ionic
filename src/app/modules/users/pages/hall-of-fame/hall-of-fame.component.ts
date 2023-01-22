import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.scss'],
})
export class HallOfFameComponent implements OnInit {
  public users: any = [];

  constructor() {}

  ngOnInit() {
    this.users = [
      {
        name: 'John',
        points: 100,
        avatar: 'https://placeimg.com/192/192/people',
      },
      {
        name: 'John',
        points: 100,
        avatar: 'https://placeimg.com/192/192/people',
      },
      {
        name: 'John',
        points: 100,
        avatar: 'https://placeimg.com/192/192/people',
      },
      {
        name: 'John',
        points: 100,
        avatar: 'https://placeimg.com/192/192/people',
      },
    ];
  }
}
