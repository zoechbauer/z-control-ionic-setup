import { Injectable, OnDestroy } from '@angular/core';
import { Capacitor, type PluginListenerHandle } from '@capacitor/core';
import { BehaviorSubject, Subscription, fromEvent, merge, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityService implements OnDestroy {
  private readonly offlineStateDebounceMs = 500;

  /**
   * Emits when the offline status changes.
   */
  offlineChangedSub = new BehaviorSubject<boolean>(!this.isOnline());
  /**
   * Observable for offline status change events.
   */
  offlineChanged$ = this.offlineChangedSub.asObservable();

  private monitoringSubscription?: Subscription;
  private nativeNetworkListener?: PluginListenerHandle;

  /**
   * Returns the current offline state snapshot.
   */
  get isOffline(): boolean {
    return this.offlineChangedSub.value;
  }

  
  /**
   * Updates and emits the global offline state.
   * Duplicate values are ignored to avoid unnecessary UI updates.
   *
   * @param isOffline Whether the app is currently offline.
   */
  setOfflineState(isOffline: boolean): void {
    if (this.offlineChangedSub.value === isOffline) {
      return;
    }

    this.offlineChangedSub.next(isOffline);
  }

  /**
   * Starts monitoring the network connectivity status.
   * Sets up appropriate listeners for both web and native platforms.
   *
   * @returns void
   */
  startMonitoring(): void {
    if (this.monitoringSubscription || this.nativeNetworkListener) {
      return;
    }

    if (Capacitor.isNativePlatform()) {
      void this.startNativeMonitoring();
      return;
    }

    const onlineStatus$ = merge(
      of(this.isOnline()),
      fromEvent(globalThis, 'online').pipe(map(() => true)),
      fromEvent(globalThis, 'offline').pipe(map(() => false)),
    ).pipe(
      debounceTime(this.offlineStateDebounceMs),
      distinctUntilChanged(),
    );

    this.monitoringSubscription = onlineStatus$.subscribe((isOnline) => {
      this.setOfflineState(!isOnline);
    });
  }

  /**
   * Notifies the service that a network request has failed due to connectivity issues.
   * This will set the offline state to true.
   * @returns void
   */
  notifyRequestNetworkError(): void {
    this.setOfflineState(true);
  }

  /**
   * Cleans up any active network monitoring subscriptions and listeners.
   * @returns void
   */
  ngOnDestroy(): void {
    this.monitoringSubscription?.unsubscribe();
    void this.nativeNetworkListener?.remove();
    this.nativeNetworkListener = undefined;
  }

  /**
   * Starts monitoring network connectivity on native platforms using the Capacitor Network plugin.
   * @returns void
   */
  private async startNativeMonitoring(): Promise<void> {
    const networkPlugin = (Capacitor as any).Plugins?.Network;

    if (!networkPlugin) {
      this.setOfflineState(!this.isOnline());
      return;
    }

    const initialStatus = await networkPlugin.getStatus();
    this.setOfflineState(!initialStatus.connected);

    this.nativeNetworkListener = await networkPlugin.addListener(
      'networkStatusChange',
      ({ connected }: { connected: boolean }) => {
        this.setOfflineState(!connected);
      },
    );
  }

  /**
   * Checks if the app is currently online based on the browser's navigator.onLine property.
   * @returns boolean indicating the online status.
   */
  private isOnline(): boolean {
    return globalThis.navigator?.onLine ?? true;
  }
}
