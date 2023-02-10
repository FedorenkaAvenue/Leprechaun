import {Injectable, isDevMode} from '@angular/core';

@Injectable()
export class LocalStorageService {

  private readonly localStorage = window.localStorage;

  constructor() { }

  public getItem<T>(key: string): string | null | undefined {
    try {
      return this.localStorage.getItem(key);
     
    } catch (error) {
      this.logError(error);
      return null;
    }
  }

  public setItem<T>(key: string, value: T): void {
    try {
      this.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      this.logError(error);
    }
  }

  public removeItem(key: string): void {
    try {
      this.localStorage.removeItem(key);
    } catch (error) {
      this.logError(error);
    }
  }

  public clearStorage(): void {
    try {
      this.localStorage.clear();
    } catch (error) {
      this.logError(error);
    }
  }

  private logError(error: string): void {
    if (isDevMode()) {
      console.log(error);
    }
  }

}