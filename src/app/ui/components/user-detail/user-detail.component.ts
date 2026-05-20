import { Component, Input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  ModalController,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { DisplayedUserStatistics } from 'src/app/shared/firebase-firestore.interfaces';
import { UtilsService } from 'src/app/services/utils.service';
import { DisplayMode } from 'src/app/shared/enums';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    CommonModule,
    TranslatePipe,
  ],
})
export class UserDetailComponent {
  @Input() lang!: string;
  @Input() userStatistic!: DisplayedUserStatistics;
  @Input() displayMode!: DisplayMode;
  DisplayMode = DisplayMode;
  targetLanguagesDisplay: string = '';

  constructor(
    public translate: TranslateService,
    private readonly modalCtrl: ModalController,
    private readonly utilsService: UtilsService
  ) {}

  close(): void {
    this.modalCtrl.dismiss();
  }

  getAppVersion(): string {
    return `${this.userStatistic.deviceInfo.appVersion.major}.${this.userStatistic.deviceInfo.appVersion.minor} (${this.userStatistic.deviceInfo.appVersion.date})`;
  }

  getFormatDateTime(dateTime: Date | null): string {
    if (this.displayMode === DisplayMode.Programmer) {
      return this.utilsService.formatDateTimeISO(dateTime);
    }

    return this.utilsService.formatDateISO(dateTime);
  }

  getDisplayedPlatform(): string {
    const platform = this.userStatistic.displayedPlatform;
    return platform === 'native' ? `${platform} - Android App` : platform;
  }

}
