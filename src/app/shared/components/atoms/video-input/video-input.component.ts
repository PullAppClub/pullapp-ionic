import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-video-input',
  templateUrl: './video-input.component.html',
  styleUrls: ['./video-input.component.scss'],
})
export class VideoInputComponent implements OnInit {
  public url: string | ArrayBuffer | null | undefined;
  public video?: File;

  @Output()
  public videoEmitter = new EventEmitter<File>();

  constructor() {}

  ngOnInit() {}

  public handleVideo(event: any): void {
    this.url = null;
    this.video = event.target.files[0];

    if (this.video) {
      const reader = new FileReader();

      reader.readAsDataURL(this.video);
      reader.onload = event => {
        this.url = (<FileReader>event.target).result;
      };

      this.videoEmitter.emit(this.video);
    }
  }
}
