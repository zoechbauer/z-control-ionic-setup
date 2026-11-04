import { NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { LogoType } from '@app/shared/enums';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class LogoComponent implements OnInit, OnChanges {
  @Input() type?: LogoType;
  leftLogoText: string = '';
  rightLogoText: string = '';
  LogoType = LogoType;

  constructor() {
    window.addEventListener('resize', () => {
      this.setLogoText();
    });
  }

  /**
   * Initializes the component and sets the initial logo text.
   */
  ngOnInit(): void {
    this.setLogoText();
  }

  /**
   * Responds to changes in input properties and updates the logo text if the type changes.
   * @param changes The changes to the input properties.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) {
      this.setLogoText();
    }
  }

  /**
   * Sets the logo text based on the current type and screen orientation.
   */
  private setLogoText(): void {
    this.leftLogoText = '';
    this.rightLogoText = '';

    if (this.type === LogoType.Copyright) {
      this.leftLogoText = '© 2026';
      this.rightLogoText = 'z-control';
    } else {
      // show company only on landscape mode
      this.rightLogoText = this.isPortrait ? '' : 'z-control';
    }
  }

  /**
   * Determines if the screen is in portrait orientation.
   * @returns True if the screen is in portrait orientation, false otherwise.
   */
  private get isPortrait(): boolean {
    return window.matchMedia('(orientation: portrait)').matches;
  }
}
