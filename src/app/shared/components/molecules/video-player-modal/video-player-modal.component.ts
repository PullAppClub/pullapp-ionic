import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-video-player-modal',
  templateUrl: './video-player-modal.component.html',
  styleUrls: ['./video-player-modal.component.scss'],
})
export class VideoPlayerModalComponent implements OnInit {
  public playVideo: boolean = false;

  @ViewChild('video')
  public videoRef!: ElementRef;

  @Input()
  public forLabelId!: string;

  @Input()
  public url!: string;

  constructor() {}

  ngOnInit() {}

  public modalToggle(): void {
    this.playVideo = !this.playVideo;

    if (this.playVideo) {
      this.videoRef.nativeElement.play();
    } else {
      this.videoRef.nativeElement.currentTime = 0;
      this.videoRef.nativeElement.pause();
    }
  }
}
