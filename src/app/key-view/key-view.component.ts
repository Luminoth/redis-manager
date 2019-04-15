import {
  Component, OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-key-view',
  templateUrl: './key-view.component.html',
  styleUrls: ['./key-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyViewComponent implements OnInit {

  //#region Lifecycle

  constructor() {
  }

  ngOnInit() {
  }

  //#endregion

}
