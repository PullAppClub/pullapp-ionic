import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-text-modal',
  templateUrl: './text-modal.component.html',
  styleUrls: ['./text-modal.component.scss'],
})
export class TextModalComponent implements OnInit {
  @Input()
  public forLabelId!: string;

  @Input()
  public textKey!: string;

  @Input()
  public acceptButtonKey!: string;

  @Input()
  public showWarningAnimation = false;

  @Output()
  public textEmitter = new EventEmitter<string>();

  public textFormGroup = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.min(2)]),
  });

  public lottieOptions: AnimationOptions = {
    path: '/assets/lottie/warns.json',
  };

  constructor() {}

  ngOnInit() {}

  public emitText(): void {
    const text = this.textFormGroup.get('text')?.value;

    if (text) {
      this.textEmitter.emit(text);
    }
  }
}
