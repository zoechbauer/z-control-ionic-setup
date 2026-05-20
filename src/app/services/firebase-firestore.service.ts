import {
  Injectable,
  inject,
  Injector,
} from '@angular/core';
import { Subject } from 'rxjs';

import { UtilsService } from './utils.service';
import { LocalStorageService } from './local-storage.service';
import {
  FirestoreContingentData,
  UserTranslationStatistics,
  UserType,
  ProgrammerDeviceUID,
  DeviceInfo,
  CharCountResult,
} from '../shared/firebase-firestore.interfaces';
import { ToastService } from './toast.service';
import { AllMonthsOption } from '../shared/enums';
import { DeviceUtils } from './device-utils.service';

@Injectable({ providedIn: 'root' })
export class FirebaseFirestoreService {
  private readonly programmerDeviceRefreshSubject = new Subject<void>();
  readonly programmerDeviceRefresh$ =
    this.programmerDeviceRefreshSubject.asObservable();

  private readonly injector: Injector;
  private cachedIsProgrammerDevice: boolean = false;
  private readonly cachedTranslations = new Map<
    string,
    UserTranslationStatistics[]
  >();

  constructor(
    private readonly utilsService: UtilsService,
    private readonly localStorageService: LocalStorageService,
    private readonly toastService: ToastService
  ) {
    this.injector = inject(Injector);
  }

  get isProgrammerDevice(): boolean {
    return this.cachedIsProgrammerDevice;
  }

  async init() {
    this.cachedIsProgrammerDevice = await this.getIsProgrammerDevice();
    this.programmerDeviceRefreshSubject.next();
  }

  public async getUsers(selectedMonth: string): Promise<UserType[]> {
    console.log('getUsers is not implemented yet, returning empty array');
    return [];
  }

  private userHasTranslationsInMonth(userId: string, month: string): boolean {
    const translationsForMonth = this.cachedTranslations.get(month);
    if (translationsForMonth) {
      const hasTranslations = translationsForMonth.some(
        (stat) => stat.userId === userId && stat.translatedCharCount > 0
      );
      return hasTranslations;
    }
    return false;
  }

  private get deviceInfo(): DeviceInfo {
    return DeviceUtils.getDeviceInfo();
  }

  public async getProgrammerDeviceUIDs(): Promise<ProgrammerDeviceUID[]> {
    console.log('getProgrammerDeviceUIDs is not implemented yet, returning empty array');
    return [];
  }

  public async getIsProgrammerDevice(): Promise<boolean> {
    return true;
  }

  async readContingentData(
    selectedMonth: string
  ): Promise<FirestoreContingentData> {
    console.log('readContingentData is not implemented yet, returning empty object');
    return {};
  }

  async getCharCountForUser(): Promise<CharCountResult> {
    console.log('getCharCountForUser is not implemented yet, returning placeholder result');
    return { charCount: 0, targetLanguages: [] };
  }

  async getTotalCharCount(
    selectedMonth: string | undefined = undefined
  ): Promise<number> {
    console.log('getTotalCharCount is not implemented yet, returning 0');
    return 0;
  }

  getCurrentUserId(): string | null {
    console.log('getCurrentUserId is not implemented yet, returning placeholder UID');
    return 'firebase-user-id-placeholder';
  }

  async getAllUserTranslationStatistics(
    selectedMonth: string
  ): Promise<UserTranslationStatistics[]> {
    try {
      let result: UserTranslationStatistics[] = [];

      if (selectedMonth === AllMonthsOption.localStorageValue) {
        const allMonths =
          this.utilsService.getAllFirestoreSearchStringsForMonth();

        for (const month of allMonths) {
          if (month !== AllMonthsOption.localStorageValue) {
            const statsForMonth =
              await this.getAllUserTranslationStatisticsForMonth(month);
            result = result.concat(statsForMonth);
          }
        }
      } else {
        result = await this.getAllUserTranslationStatisticsForMonth(
          selectedMonth
        );
      }
      return result;
    } catch (error) {
      console.error(
        `Error fetching all user statistics for month ${selectedMonth}:`,
        error
      );
      return [];
    }
  }

  private async getAllUserTranslationStatisticsForMonth(
    selectedMonth: string
  ): Promise<UserTranslationStatistics[]> {
    console.log('getAllUserTranslationStatisticsForMonth is not implemented yet, returning empty array');
    return [];
  }

  private getCachedTranslationsForPreviousMonth(
    month: string
  ): UserTranslationStatistics[] | undefined {
    const currentMonth = this.utilsService.getCurrentMonth();
    if (currentMonth !== month) {
      const cached = this.cachedTranslations.get(month);
      if (cached) {
        return cached;
      }
    }
    return undefined;
  }

}
