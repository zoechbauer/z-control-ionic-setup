import { Component, Input, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
} from '@ionic/angular/standalone';
import { NgIf, AsyncPipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LogoType, Tab } from '@app/shared/enums';
import { UtilsService } from '@app/services/utils.service';
import { ConnectivityService } from '@app/services/connectivity.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    NgIf,
    LogoComponent,
    AsyncPipe,
  ],
})
export class HeaderComponent {
  translate = inject(TranslateService);
  readonly utilsService = inject(UtilsService);
  readonly connectivityService = inject(ConnectivityService);

  @Input() currentTab!: Tab;
  LogoType = LogoType;
  Tab = Tab;
  showBackButton: boolean = false;

  /**
   * Determines if the screen size is considered large.
   * @returns True if the screen is large, false otherwise.
   */
  get isLargeScreen(): boolean {
    return !this.utilsService.isSmallScreen;
  }

  /**
   * Determines if the current tab is the main feature tab.
   * @returns True if the current tab is the main feature tab, false otherwise.
   */
  get onMainFeatureTab(): boolean {
    return this.currentTab === Tab.MainFeature;
  }

  /**
   * Determines if the current tab is the settings tab.
   * @returns True if the current tab is the settings tab, false otherwise.
   */
  get onSettingsTab(): boolean {
    return this.currentTab === Tab.Settings;
  }

  /**
   * Determines if the tabs bar should be hidden.
   * @returns True if the tabs bar should be hidden, false otherwise.
   */
  get hideTabsBar(): boolean {
    return !this.utilsService.isShowIonTabBar;
  }

  /**
   * Navigates to the settings tab.
   */
  async goToSettings() {
    await this.utilsService.navigateToTab(Tab.Settings);
  }

  /**
   * Navigates to the main feature tab.
   */
  async goToMainFeature() {
    await this.utilsService.navigateToTab(Tab.MainFeature);
  }

  /**
   * Navigates to the settings tab and opens the feedback section.
   */
  async goToSettingsAndOpenFeedback() {
    await this.utilsService.navigateToTabWithParams(Tab.Settings, {
      open: 'z-control',
    });
    setTimeout(() => {
      this.utilsService.logoClickedSub.next(true);
    }, 500);
  }
  
  /**
   * Opens the help modal.
   */
  openHelpModal(): Promise<void> {
    return this.utilsService.openHelpModal();
  }

  /**
   * Handles the back button click event.
   * @param event The click event.
   */
  goBack(event: Event) {
    this.utilsService.backButtonClickedSub.next(true);
  }
}
