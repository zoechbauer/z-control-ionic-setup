import { Component, Input, inject } from '@angular/core';
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

import { DisplayedUserStatistics } from '@app/shared/firebase-firestore.interfaces';
import { UtilsService } from '@app/services/utils.service';
import { DisplayMode } from '@app/shared/enums';

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
  translate = inject(TranslateService);
  private readonly modalCtrl = inject(ModalController);
  private readonly utilsService = inject(UtilsService);

  @Input() lang!: string;
  @Input() userStatistic!: DisplayedUserStatistics;
  @Input() displayMode!: DisplayMode;
  DisplayMode = DisplayMode;

  async close(): Promise<void> {
    await this.modalCtrl.dismiss();
  }

  /**
   * Retrieves the app version from the user statistics.
   * @returns The formatted app version string.
   */
  getAppVersion(): string {
    if (!this.userStatistic?.deviceInfo?.appVersion?.date) {
      return '';
    }
    const v = this.userStatistic.deviceInfo.appVersion;
    return `${v.major}.${v.minor} (${v.date})`;
  }

  /**
   * Formats the given date and time according to the current display mode.
   * @param dateTime The date and time to format.
   * @returns The formatted date and time string.
   */
  getFormatDateTime(dateTime: Date | null): string {
    if (this.displayMode === DisplayMode.Programmer) {
      return this.utilsService.formatDateTimeISO(dateTime);
    }

    return this.utilsService.formatDateISO(dateTime);
  }

  /**
   * Retrieves the displayed platform information from the user statistics.
   * @returns The formatted platform string.
   */
  getDisplayedPlatform(): string {
    const platform = this.userStatistic.displayedPlatform;
    return platform === 'native' ? `${platform} - Android App` : platform;
  }
}
