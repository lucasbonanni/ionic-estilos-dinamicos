import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
/*
  Generated class for the ColorSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ColorSettingsProvider {

  private theme: BehaviorSubject<String>;
 
  constructor() {
      this.theme = new BehaviorSubject('dark-theme');
  }

  setActiveTheme(val) {
      this.theme.next(val);
  }

  getActiveTheme() {
      return this.theme.asObservable();
  }

}
