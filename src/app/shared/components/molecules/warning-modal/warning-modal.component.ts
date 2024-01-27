import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

/**
 * @class WarningModalComponent
 * @description is a component that shows a warning modal with a lottie animation. Generally used to show a warning message to the user.
 * @example
 *  in the component's html file:
 *  <label [for]="warningLabelId" class="btn" #openModalBtn></label>
 *   <app-warning-modal
 *     tKey="MODULES.CHALLENGE.UPLOADING_PARTICIPATION_VIDEO"
 *     [modalId]="warningLabelId">
 *   </app-warning-modal>
 *  in the component's .ts file:
 *   @ViewChild('openModalBtn', { read: ElementRef })
 *   public openModalBtn!: ElementRef;
 *   public warningLabelId = 'warningModalIdChallengeComponent';
 */
@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss'],
})
export class WarningModalComponent implements OnInit {
  @Input()
  public closeModalCallback?: <T = void>(...params: []) => T;

  @Input()
  public tKey!: string;

  @Input()
  public modalId!: string;

  @ViewChild('modalToggle')
  public modalToggle!: ElementRef;

  public lottieOptions: AnimationOptions = {
    path: '/assets/lottie/warns.json',
  };

  constructor() {}

  ngOnInit() {}

  public modalToggleClick(): void {
    this.modalToggle.nativeElement.click();
    this.closeModalCallback?.();
  }
}
