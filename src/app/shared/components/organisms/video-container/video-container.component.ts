import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../../modules/events/interfaces/challenge.interface';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.scss'],
})
export class VideoContainerComponent implements OnInit {

  @Input()
  public challenge!: Challenge;

  @Input({ required: false })
  public iconClickCallback?: () => void;

  @Input()
  public videoPlayerLabelId!: string;

  constructor() { }

  ngOnInit() {}

}
