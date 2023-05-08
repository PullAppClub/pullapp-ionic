import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-spot-card-md',
  templateUrl: './spot-card-md.component.html',
  styleUrls: ['./spot-card-md.component.scss'],
})
export class SpotCardMdComponent implements OnInit {
  public images!: GalleryItem[];
  constructor() {}

  ngOnInit() {
    this.images = [
      new ImageItem({
        src: 'https://placeimg.com/192/192/people',
      }),
      new ImageItem({
        src: 'https://placeimg.com/192/192/people',
      }),
      new ImageItem({
        src: 'https://placeimg.com/192/192/people',
      }),
      new ImageItem({
        src: 'https://placeimg.com/192/192/people',
      }),
    ];
  }
}
