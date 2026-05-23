import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { UtilsService } from '../services/utils.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ToastService } from '../services/toast.service';
import { ToastAnchor } from '../shared/enums';
import { FirebaseFirestoreUtilsService } from '../services/firebase-firestore-utils.service';
import { FeatureService } from '../services/feature.service';
import { FeatureResult } from 'functions/src/shared/firebase-firestore.interfaces';

@Component({
  selector: 'app-feature-example',
  templateUrl: './feature-example.component.html',
  styleUrls: ['./feature-example.component.scss'],
  imports: [
    IonCardSubtitle,
    IonInput,
    IonButton,
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    FormsModule,
    TranslatePipe,
  ],
})
export class FeatureExampleComponent implements OnInit {
  featureInput: string = '';
  relatedWords: string[] = [];
  isLoading = false;
  isContingentExceeded: boolean = false;
  searchBtnDisabled: boolean = false;
  clearBtnDisabled: boolean = false;

  constructor(
    public translate: TranslateService,
    public localStorage: LocalStorageService,
    public readonly utilsService: UtilsService,
    private readonly toastService: ToastService,
    private readonly firestoreUtilsService: FirebaseFirestoreUtilsService,
    private readonly featureService: FeatureService,
  ) {}

  ngOnInit() {
    this.updateIsContingentExceeded().then(() => {
      this.initFormControls();
      this.isLoading = false;
    });
  }

  private async updateIsContingentExceeded() {
    this.isContingentExceeded =
      await this.firestoreUtilsService.isContingentExceeded();
  }

  enableButtons(): void {
    const hasText = this.featureInput.trim().length > 0;
    this.searchBtnDisabled = !hasText;
    this.clearBtnDisabled = !hasText;
  }

  async search() {
    this.toastService.showToast(
      this.translate.instant('FEATURE.TOAST.QUOTA_REDUCED'),
    );

    this.isLoading = true;
    await this.updateIsContingentExceeded();

    if (this.isContingentExceeded) {
      this.toastService.showToast(
        this.translate.instant('FEATURE.TOAST.CONTINGENT_EXCEEDED'),
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
    } catch (error: any) {
      if (error?.message?.includes('contingent')) {
        this.toastService.showToast(
          this.translate.instant('FEATURE.TOAST.CONTINGENT_EXCEEDED'),
          ToastAnchor.MainPage,
        );
      } else {
        console.error('Translation error:', error);
        this.toastService.showToast(
          this.translate.instant('FEATURE.TOAST.ERROR_CALLING_FEATURE'),
          ToastAnchor.MainPage,
        );
      }
    } finally {
      this.isLoading = false;
    }
  }

  clear(): void {
    this.initFormControls();
  }

  private displayFeatureResults(featureResults: FeatureResult): void {
    this.relatedWords =
      featureResults.feature['related'].split(', ');
  }

  private initFormControls(): void {
    this.featureInput = '';
    this.relatedWords = [];
    this.enableButtons();
  }
}
