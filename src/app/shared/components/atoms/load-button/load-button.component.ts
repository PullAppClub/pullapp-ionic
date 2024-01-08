import { Component, Input, OnInit } from '@angular/core';
import { LangService } from '../../../../core/services/lang/lang.service';

@Component({
  selector: 'app-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.scss'],
})
export class LoadButtonComponent implements OnInit {
  public text?: string;

  @Input()
  public tKey!: string;

  @Input()
  public inputText!: string;

  @Input()
  public disabled: boolean = false;

  @Input()
  public showSpinner: boolean = false;

  @Input()
  public callback!: () => void | Promise<void>;

  constructor(private readonly langService: LangService) {}

  ngOnInit(): void {
    if (this.tKey) {
      this.langService.t(this.tKey).subscribe({
        next: (text: string) => (this.text = text),
      });
    } else {
      this.text = this.inputText;
    }
  }
}
