import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageHelper {
  constructor() {}

  public setString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getString(key: string): string {
    return localStorage.getItem(key) as string;
  }

  public setObject<T>(key: string, obj: T): void {
    this.setString(key, JSON.stringify(obj));
  }

  public getObject<T>(key: string): T {
    return JSON.parse(this.getString(key) as string) as T;
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
