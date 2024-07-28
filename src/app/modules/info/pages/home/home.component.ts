import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public title = 'pullapp';
  public isAnimating = false;

  public lottieOptions: AnimationOptions = {
    path: '/assets/lottie/flex-arms.json',
  };

  constructor() {}

  ngOnInit() {}

  public animateToken() {
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, 1500);
  }
}
