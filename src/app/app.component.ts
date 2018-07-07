import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';
import { ColorSettingsProvider } from '../providers/color-settings/color-settings';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          <i class="fa fa-{{p.icon}} {{p.color}}" aria-hidden="true"></i>
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage" [class]="selectedTheme"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;
  selectedTheme: String;
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tutorial', component: 'TutorialPage', icon: 'book', color: 'faGreen' },
    { title: 'Welcome', component: 'WelcomePage', icon: 'handshake-o', color: 'faOrange' },
    { title: 'Tabs', component: 'TabsPage', icon: 'window-restore', color: 'faLightBlue' },
    { title: 'Cards', component: 'CardsPage', icon: 'address-card', color: 'faYellow' },
    { title: 'Content', component: 'ContentPage', icon: 'file-word-o', color: 'faOrange' },
    { title: 'Login', component: 'LoginPage', icon: 'unlock', color: 'faGreen' },
    { title: 'Signup', component: 'SignupPage', icon: 'pencil', color: 'primary' },
    { title: 'Map', component: 'MapPage', icon: 'map-o', color: 'faYellow' },
    { title: 'Master Detail', component: 'ListMasterPage', icon: 'tasks', color: 'faOrange' },
    { title: 'Menu', component: 'MenuPage', icon: 'bars', color: 'faLightBlue' },
    { title: 'Settings', component: 'SettingsPage', icon: 'cog', color: 'faGreen' },
    { title: 'Search', component: 'SearchPage', icon: 'search', color: 'faOrange' }
  ]

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, private colorSettings: ColorSettingsProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.colorSettings.getActiveTheme().subscribe(val => this.selectedTheme = val);
 
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
