import { environment } from 'src/environments/environment';

export class AppConstants {
  private static readonly _maxFreeTranslateCharsPerMonth = 500000;

  static get maxFreeTranslateCharsPerMonth(): number {
    return (
      environment.app.maxFreeTranslateCharsPerMonth ??
      this._maxFreeTranslateCharsPerMonth
    );
  }
}

// IMPORTANT: Do not change the path of FireStoreConstants as it is used in both the functions and the Angular app.
// functions/src/shared/app.constants.ts
// src/app/shared/app.constants.ts

export class FireStoreConstants {
  static readonly COLLECTION_XXX = 'z-control data for the new app';

  static readonly getUserMappingUsersCollectionPath = () => {
    return `${FireStoreConstants.COLLECTION_XXX}/userMapping/users`;
  };

  static readonly getUsersCollectionPath = (
    selectedMonth: string | undefined = undefined,
  ) => {
    let month = this.currentYearMonthPath();
    if (selectedMonth) {
      month = selectedMonth;
    }
    return `${FireStoreConstants.COLLECTION_XXX}/${month}/users`;
  };

  static readonly getMetaTotalCharsDocumentPath = (
    selectedMonth: string | undefined = undefined,
  ) => {
    let month = this.currentYearMonthPath();
    if (selectedMonth) {
      month = selectedMonth;
    }
    return `${FireStoreConstants.COLLECTION_XXX}/${month}/meta/totalChars`;
  };

  static readonly getMetaContingentDataDocumentPath = (
    selectedMonth: string | undefined = undefined,
  ) => {
    let month = this.currentYearMonthPath();
    if (selectedMonth) {
      month = selectedMonth;
    }
    return `${FireStoreConstants.COLLECTION_XXX}/${month}/meta/contingentData`;
  };

  /**
   * Returns the current year and month as a string in the format 'YYYY-MM'.
   */
  static readonly currentYearMonthPath = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  };
}
