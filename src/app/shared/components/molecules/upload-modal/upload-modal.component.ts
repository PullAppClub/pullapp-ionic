import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AcceptedFileType } from '../../../../core/enums/file-type.enum';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss'],
})
export class UploadModalComponent implements OnInit {
  @Input({ required: true })
  public forLabelId!: string;

  @Input()
  public textKey: string | undefined;

  @Input()
  public confirmButtonText: string | undefined;

  @Output()
  public file = new EventEmitter<File>();

  @Input({ required: true })
  public acceptedFileType!: AcceptedFileType;

  @Input({ required: true })
  public showUploadSpinner!: boolean;

  public selectedFile!: File;

  constructor() {}

  ngOnInit() {}

  public emitFile(): void {
    if (this.selectedFile) {
      this.file.emit(this.selectedFile);
    }
  }

  public emitFileCallback = (): void => this.emitFile();

  public onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.selectedFile = files[0];
  }
}
