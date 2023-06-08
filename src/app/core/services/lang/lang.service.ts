import { Injectable } from '@angular/core';
import { StorageHelper } from '../../helpers/storage/storage.helper';
import { TranslateService } from '@ngx-translate/core';
import { StorageKey } from '../../enums/storage-key.enum';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  constructor(
    private readonly storage: StorageHelper,
    private readonly translate: TranslateService
  ) {}

  public setLocalLang(lang: string): void {
    this.translate.use(lang);
    this.storage.setString(StorageKey.Lang, lang);
  }

  public getLangs(): string[] {
    return this.translate.getLangs();
  }

  public getCurrentLang(): string {
    return this.translate.currentLang;
  }

  public setupLang(): void {
    this.translate.addLangs(['en', 'it']);
    this.translate.setDefaultLang('en');

    const localLang: string = this.storage.getString(StorageKey.Lang);

    if (!localLang) {
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang?.match(/en|it/) ? browserLang : 'en');
    } else {
      this.translate.use(localLang);
    }
  }

  /**
   * Returns the translated string by key.
   */
  public async t(key: string): Promise<string> {
    return firstValueFrom(this.translate.get(key));
  }
}
