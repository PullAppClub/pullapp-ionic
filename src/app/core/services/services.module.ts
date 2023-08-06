import { NgModule } from '@angular/core';
import { environment } from '../../../environments/environment';

import { FirebaseService } from './firebase/firebase.service';
import { SessionService } from './session/session.service';
import { ToastService } from './toast/toast.service';
import { NotificationService } from './notification/notification.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LangService } from './lang/lang.service';
import { TabBarService } from './tab-bar/tab-bar.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { AngularFireModule } from '@angular/fire/compat';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    AngularFireModule.initializeApp(environment.firebase),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    FirebaseService,
    SessionService,
    ToastService,
    NotificationService,
    LangService,
    TabBarService,
  ],
})
export class ServicesModule {}
