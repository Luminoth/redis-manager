import {
  Component, OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-console-view',
  templateUrl: './console-view.component.html',
  styleUrls: ['./console-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleViewComponent implements OnInit {

  //#region Lifecycle

  constructor() {
  }

  ngOnInit() {
  }

  //#endregion

}
