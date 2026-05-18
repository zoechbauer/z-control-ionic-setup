import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonLabel,
  IonIcon,
  IonTabButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
    imports: [
    IonTabs,
    IonTabBar,
    IonLabel,
    IonIcon,
    IonTabButton,
  ],
})
export class TabsPage {
  constructor() {}
}
