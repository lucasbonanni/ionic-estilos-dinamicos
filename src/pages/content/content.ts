import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ColorSettingsProvider } from '../../providers/color-settings/color-settings';

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

  selectedTheme: String;
 
  constructor(public navCtrl: NavController, private settings: ColorSettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }
 
  public toggleAppTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }

}
