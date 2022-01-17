import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  /**
   * @Internal
   */
  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message: string, action: string | undefined, duration: any) {
    this.snackbar.open(message, action, {
      duration: duration,
    });
  }
}
