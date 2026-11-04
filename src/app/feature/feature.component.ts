import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonInput,
  IonCardSubtitle,
  IonList,
  IonListHeader,
} from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { UtilsService } from '../services/utils.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ToastService } from '../services/toast.service';
import { ToastAnchor } from '../shared/enums';
import { FirebaseFirestoreUtilsService } from '../services/firebase-firestore-utils.service';
import { FeatureService } from '../services/feature.service';
import { ConnectivityService } from '../services/connectivity.service';
import { SpinnerComponent } from '../ui/components/spinner/spinner.component';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  imports: [
    IonListHeader,
    IonCardSubtitle,
    IonInput,
    IonButton,
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonListHeader,
    CommonModule,
    FormsModule,
    TranslatePipe,
    SpinnerComponent,
  ],
})
export class FeatureComponent implements OnInit, OnDestroy {
  translate = inject(TranslateService);
  localStorage = inject(LocalStorageService);
  readonly utilsService = inject(UtilsService);
  private readonly connectivityService = inject(ConnectivityService);
  private readonly toastService = inject(ToastService);
  private readonly firestoreUtilsService = inject(
    FirebaseFirestoreUtilsService,
  );
  private readonly featureService = inject(FeatureService);

  featureInput: string = '';
  relatedWords: string[] = [];
  isLoading = false;
  isContingentExceeded: boolean = false;
  featureInputDisabled: boolean = false;
  searchBtnDisabled: boolean = false;
  clearBtnDisabled: boolean = false;
  private readonly subscriptions: Subscription[] = [];

  /**
   * Initializes the component by setting up subscriptions and updating the contingent status.
   */
  ngOnInit() {
    this.setupSubscriptions();

    void this.updateIsContingentExceeded().then(() => {
      this.initFormControls();
      this.isLoading = false;
    });
  }

  /**
   * Sets up subscriptions to listen for connectivity changes.
   */
  private setupSubscriptions() {
    this.subscriptions.push(
      this.connectivityService.offlineChanged$.subscribe(() => {
        this.enableButtons();
      })
    );
  }

  /**
   * Use this function to check if the user has exceeded their contingent for calling the feature.
   */
  private async updateIsContingentExceeded() {
    this.isContingentExceeded =
      await this.firestoreUtilsService.isContingentExceeded();
  }

  /**
   * Updates the state of the search and clear buttons based on the current input and connectivity status.
   */
  enableButtons(): void {
    const hasText = this.featureInput.trim().length > 0;
    this.searchBtnDisabled = !hasText || this.connectivityService.isOffline;
    this.clearBtnDisabled = !hasText;
  }

  /**
   * Disables the feature input and buttons.
   */
  disableFormControls(): void {
    this.featureInputDisabled = true;
    this.searchBtnDisabled = true;
    this.clearBtnDisabled = false;
  }

  /**
   * Searches for features based on the user input if device is online.
   * Processes the feature input and returns the results.
   */
  async search() {
    if (this.connectivityService.isOffline) {
      return;
    }

    this.isLoading = true;
    await this.updateIsContingentExceeded();

    if (this.isContingentExceeded) {
      this.toastService.showToast(
        this.translate.instant('FEATURE.TOAST.CONTINGENT_EXCEEDED'),
        ToastAnchor.MainPage,
      );
      this.isLoading = false;
      return;
    }

    try {
      const featureResults =
        await this.featureService.secureFeatureCloudFunction({
          text: this.featureInput,
        });
      if (!featureResults) {
        this.isLoading = false;
        return;
      }
      this.displayFeatureResults(featureResults);
      this.firestoreUtilsService.requestStatisticsRefresh();
      this.toastService.showToast(
        this.translate.instant('FEATURE.TOAST.QUOTA_REDUCED'),
        ToastAnchor.MainPage,
      );
    } catch (error: any) {
      if (error?.message?.includes('contingent')) {
        this.toastService.showToast(
          this.translate.instant('FEATURE.TOAST.CONTINGENT_EXCEEDED'),
          ToastAnchor.MainPage,
        );
      } else {
        console.error('Feature error:', error);
        this.toastService.showToast(
          this.translate.instant('FEATURE.TOAST.ERROR_CALLING_FEATURE'),
          ToastAnchor.MainPage,
        );
      }
    } finally {
      this.isLoading = false;
      this.disableFormControls();
    }
  }

  /**
   * Clears the feature input and resets the form controls.
   */
  clear(): void {
    this.initFormControls();
  }

  /**
   * Displays the feature results by extracting related words from the response.
   */
  private displayFeatureResults(featureResults: any): void {
    this.relatedWords = featureResults.feature['related'].split(', ');
  }

  /**
   * Initializes the form controls by resetting the feature input and related words,
   * and updating button states.
   */
  private initFormControls(): void {
    this.featureInput = '';
    this.featureInputDisabled = false;
    this.relatedWords = [];
    this.enableButtons();
  }

  /**
   * Cleans up subscriptions when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
