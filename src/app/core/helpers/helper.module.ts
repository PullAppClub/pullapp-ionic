import { NgModule } from '@angular/core';
import { HttpHelper } from './http/http-helper.service';
import { StorageHelper } from './storage/storage.helper';
import { NavigationHelper } from './navigation/navigation.helper';
import { HttpErrorHandlerHelper } from './http-error-handler/http-error-handler.helper';
import { CryptoHelper } from './crypto/crypto.helper';
import { DateHelper } from './date/date.helper';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from '../interceptors/http-request/http-request.interceptor';

@NgModule({
  providers: [
    HttpHelper,
    StorageHelper,
    NavigationHelper,
    HttpErrorHandlerHelper,
    CryptoHelper,
    DateHelper,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
})
export class HelperModule {}
