import {
  Component, OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs';

import { LogService } from '../log.service';

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogViewComponent implements OnInit, OnDestroy {

  // subscriptions
  private _log: Subscription;

  //#region Lifecycle

  constructor(private cd: ChangeDetectorRef,
    public log: LogService) {
    this._log = this.log.log$.subscribe(message => {
      this.cd.markForCheck();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._log.unsubscribe();
  }

  //#endregion

}
