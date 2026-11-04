import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {
  IonToolbar,
  IonTitle,
  IonHeader,
  IonIcon,
  IonButton,
  IonContent,
  IonButtons,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

import { LocalStorageService } from '@app/services/local-storage.service';
import { UtilsService } from '@app/services/utils.service';
import { AppConstants } from '@app/shared/app.constants';
import { environment } from '@env/environment';

@Component({
  selector: 'app-get-help',
  templateUrl: './get-help.component.html',
  styleUrls: ['./get-help.component.scss'],
  imports: [
    IonButtons,
    IonContent,
    IonButton,
    IonIcon,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
  ],
})
export class HelpModalComponent implements OnInit, OnDestroy {
  readonly utilsService = inject(UtilsService);
  private readonly modalController = inject(ModalController);
  private readonly translate = inject(TranslateService);
  private readonly localStorage = inject(LocalStorageService);

  // Optional: ID of the section to scroll to when the modal opens (e.g., 'floating-keyboard' or 'web-version')
  @Input() scrollToSection?: string;

  readonly scrollToTopObj = {
    id: 'toc-DE',
    text: this.translate.instant('SCROLL_TO_TOP_DE'),
  };
  selectedLanguage: string = 'de';
  isPortrait = this.utilsService.isPortrait;
  private langSub?: Subscription;

  /**
   * Gets the maximum number of free feature characters allowed per month.
   */
  get maxFreeFeatureCharsLengthPerMonth() {
    return AppConstants.maxFreeFeatureCharsPerMonth;
  }

  /**
   * Determines if the app is running in a native environment.
   */
  get isNative(): boolean {
    return this.utilsService.isNative;
  }

  /**
   * Gets the email subject text for the help email, depending on the platform.
   */
  get emailSubjectHelpText(): string {
    const key = this.isNative ? 'HELP_EMAIL_SUBJECT' : 'HELP_EMAIL_SUBJECT_WEB';
    return this.translate.instant(key);
  }

  /**
   * Gets the help text for the language change button, depending on the platform.
   */
  get languageChangeButtonHelpText(): string {
    const key = this.isNative
      ? 'HELP_LANGUAGE_CHANGE_BUTTON'
      : 'HELP_LANGUAGE_CHANGE_WEB_BUTTON';
    return this.translate.instant(key);
  }
  /**
   * Gets the device-specific help text, depending on the platform.
   */
  get deviceText(): string {
    const key = this.isNative ? 'HELP_DEVICE_TEXT' : 'HELP_DEVICE_TEXT_WEB';
    return this.translate.instant(key);
  }

  /**
   * Gets the app name from the environment configuration.
   */
  get appName(): string {
    return environment.app.name;
  }

  /**
   * Gets the short name of the app from the environment configuration.
   */
  get appShortName(): string {
    return environment.app.shortName;
  }

  /**
   * Gets the current orientation of the device (portrait or landscape).
   */
  private readonly orientationListener = () => {
    this.isPortrait = this.utilsService.isPortrait;
  };

  /**
   * Initializes the component and sets up necessary event listeners.
   */
  ngOnInit() {
    // Scroll to specific section if provided
    if (this.scrollToSection) {
      setTimeout(() => {
        this.utilsService.scrollToElement(this.scrollToSection!);
      }, 500); // Delay to ensure modal is fully rendered
    }

    this.langSub = this.localStorage.selectedLanguage$.subscribe((lang) => {
      this.selectedLanguage = lang;
      this.setScrollToTopObj();
    });

    window.addEventListener('resize', this.orientationListener);
    window.addEventListener('orientationchange', this.orientationListener);
    this.orientationListener();
  }

  /**
   * Sets the scroll-to-top object based on the selected language.
   */
  private setScrollToTopObj() {
    if (this.selectedLanguage === 'de') {
      this.scrollToTopObj.id = 'toc-DE';
      this.scrollToTopObj.text = this.translate.instant('SCROLL_TO_TOP_DE');
    } else if (this.selectedLanguage === 'en') {
      this.scrollToTopObj.id = 'toc';
      this.scrollToTopObj.text = this.translate.instant('SCROLL_TO_TOP_EN');
    }
  }

  /**
   * Dismisses the help modal.
   */
  async dismissModal(): Promise<void> {
    await this.modalController.dismiss();
  }

  /**
   * Scrolls the view to the top of the content.
   */
  scrollToTop() {
    this.utilsService.scrollToElement(this.scrollToTopObj.id);
  }

  /**
   * Cleans up resources and event listeners when the component is destroyed.
   */
  ngOnDestroy() {
    this.langSub?.unsubscribe();
    window.removeEventListener('resize', this.orientationListener);
    window.removeEventListener('orientationchange', this.orientationListener);
  }
}
