import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TabBarService } from '../../../../core/services/tab-bar/tab-bar.service';

@Component({
  selector: 'app-video-player-modal',
  templateUrl: './video-player-modal.component.html',
  styleUrls: ['./video-player-modal.component.scss'],
})
export class VideoPlayerModalComponent {
  public playVideo: boolean = false;

  @ViewChild('video')
  public videoRef!: ElementRef;

  @Input()
  public forLabelId!: string;

  @Input()
  public url!: string;

  constructor(private readonly tabBarService: TabBarService) {}

  public modalToggle(): void {
    this.playVideo = !this.playVideo;

    if (this.playVideo) {
      this.tabBarService.setShowTabBar(false);

      this.videoRef.nativeElement?.play();
    } else {
      this.tabBarService.setShowTabBar(true);

      this.videoRef.nativeElement.currentTime = 0;
      this.videoRef.nativeElement?.pause();
    }
  }
}
