import { ToastService } from '../../services/toast/toast.service';
import { LangService } from '../../services/lang/lang.service';
import { HttpHelper } from '../http/http-helper.service';
import { Injectable } from '@angular/core';
import { ToastType } from '../../enums/toast.enum';
import { Error } from '../../interfaces/error.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerHelper {
  constructor(
    private readonly toastService: ToastService,
    private readonly langService: LangService,
    private readonly requestHelper: HttpHelper
  ) {}

  public handle(params: Error): Observable<any> {
    console.log(params);

    const key = this.requestHelper.getErrorMessage(params);

    this.langService.t(key).subscribe(message => {
      this.toastService.showToast({
        message,
        title: 'Error',
        type: ToastType.Error,
      });
    });

    return of(null);
  }
}
