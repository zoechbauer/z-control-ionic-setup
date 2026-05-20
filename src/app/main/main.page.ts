import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonAccordion,
  IonAccordionGroup,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonButton,
} from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { HeaderComponent } from '../ui/components/header/header.component';
import { UtilsService } from '../services/utils.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ToastService } from '../services/toast.service';
import { DeviceInfo } from '../shared/firebase-firestore.interfaces';
import { DeviceUtils } from '../services/device-utils.service';
import { Tab } from '../shared/enums';
import { UserStatisticComponent } from '../ui/components/user-statistic/user-statistic.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonCardSubtitle,
    IonAccordionGroup,
    IonAccordion,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    FormsModule,
    TranslatePipe,
    HeaderComponent,
    UserStatisticComponent,
  ],
})
export class MainPage implements OnInit, OnDestroy {
  Tab = Tab;
  settingsIcon: string = '<ion-icon name="settings-outline"></ion-icon>';
  isLoading = false;

  private readonly subscriptions: Subscription[] = [];

  get deviceInfos(): DeviceInfo {
    return DeviceUtils.getDeviceInfo();
  }

  isContingentExceeded: boolean = false;

  constructor(
    public translate: TranslateService,
    public localStorage: LocalStorageService,
    public readonly utilsService: UtilsService,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.utilsService.showOrHideIonTabBar();
    this.setupEventListeners();
    this.setupSubscriptions();
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', () => {
      this.utilsService.showOrHideIonTabBar();
    });
  }

  private setupSubscriptions() {
    this.subscriptions.push(
      this.localStorage.selectedLanguage$.subscribe((lang) => {
        this.translate.use(lang);
        this.translate.setDefaultLang(lang);
      }),
    );
  }

  simulateFeatureCall() {
    this.toastService.showToast(this.translate.instant('MAIN.TOAST.SIMULATION'));
  }

  onAccordionGroupChange(event: CustomEvent, content: IonContent) {
    const accordionValue = event?.detail?.value;
    if (accordionValue) {
      // TODO
      // this.firestoreUtilsService.requestStatisticsRefresh();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
