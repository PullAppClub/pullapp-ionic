import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { HttpErrorHandlerHelper } from '../../helpers/http-error-handler/http-error-handler.helper';
import { CustomHeaders } from '../../enums/http.enum';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper
  ) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<null>> {
    if (req.headers.get(CustomHeaders.SkipErrorHandlerInterceptor)) {
      return next.handle(req);
    }

    return next
      .handle(req)
      .pipe(catchError(e => this.httpErrorHandlerHelper.handle(e)));
  }
}
