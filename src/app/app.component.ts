import { Component, OnInit, Renderer2 } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';
import { LocalStorageService } from './services/local-storage.service';
import { FirebaseFirestoreService } from './services/firebase-firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  isNativeApp = false;
  showTabsBar = environment.app.showTabsBar;

  constructor(
    private readonly translate: TranslateService,
    private readonly renderer: Renderer2,
    private readonly firestoreService: FirebaseFirestoreService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {
    this.initializeApp();
  }

  async initializeApp() {
    if (this.isNativeApp) {
      this.renderer.addClass(document.body, 'native-app');
    } else {
      this.renderer.addClass(document.body, 'web-app');
    }

    await this.localStorageService.initializeServicesAsync(this.translate);
    await this.firestoreService.init();
  }
}
