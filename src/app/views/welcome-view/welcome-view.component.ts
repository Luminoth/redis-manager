import {
  Component, OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-welcome-view',
  templateUrl: './welcome-view.component.html',
  styleUrls: ['./welcome-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeViewComponent implements OnInit {

  //#region Lifecycle

  constructor() {
  }

  ngOnInit() {
  }

  //#endregion

}
