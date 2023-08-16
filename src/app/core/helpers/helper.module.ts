import { NgModule } from '@angular/core';
import { RequestHelper } from './request/request.helper';
import { StorageHelper } from './storage/storage.helper';
import { NavigationHelper } from './navigation/navigation.helper';
import { HttpErrorHandlerHelper } from './http-error-handler/http-error-handler.helper';
import { CryptoHelper } from './crypto/crypto.helper';

@NgModule({
  providers: [
    RequestHelper,
    StorageHelper,
    NavigationHelper,
    HttpErrorHandlerHelper,
    CryptoHelper,
  ],
})
export class HelperModule {}
