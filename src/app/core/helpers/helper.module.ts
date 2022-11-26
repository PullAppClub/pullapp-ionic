import { NgModule } from '@angular/core';
import { RequestHelper } from './request/request.helper';
import { StorageHelper } from './storage/storage.helper';
import { NavigationHelper } from './navigation/navigation.helper';

@NgModule({
  providers: [RequestHelper, StorageHelper, NavigationHelper],
})
export class HelperModule {}
