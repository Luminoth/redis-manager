import {
  Component, OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Subscription } from 'rxjs';

import { AppElectronService } from '../../services/app-electron.service';
import { RedisService } from '../../services/redis.service';

import { RedisServerConfig } from '../../../../electron/config';

interface RedisServerNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-server-tree',
  templateUrl: './server-tree.component.html',
  styleUrls: ['./server-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerTreeComponent implements OnInit, OnDestroy {

  // TODO: look at the angular material dynamic data example
  // this should probably do something more like that
  // since it seems like it has a much cleaner way of connecting the data

  treeControl = new FlatTreeControl<RedisServerNode>(
    node => node.level,
    node => node.expandable
  );

  private _treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, () => null);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this._treeFlattener);

  // subscriptions
  private _reloadSubscription: Subscription;

  //#region Lifecycle

  constructor(private cd: ChangeDetectorRef,
    private electron: AppElectronService,
    private redis: RedisService) {
    this._reloadSubscription = this.electron.reloadConfig$.subscribe(() => {
      this.dataSource.data = this.electron.config.redisConfig;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
    this.dataSource.data = this.electron.config.redisConfig;
  }

  ngOnDestroy() {
    this._reloadSubscription.unsubscribe();
  }

  //#endregion

  hasChild(_: number, node: RedisServerNode) {
    return node.expandable;
  }

  //#region Events

  private transformer(node: RedisServerConfig, level: number) {
    return {
      expandable: this.electron ? this.electron.redisConnections.has(node.name) : false,
      name: node.name,
      level,
    };
  }

  onConnect(connection: string) {
    this.redis.connect(connection);
  }

  onDisconnect(connection: string) {
    this.redis.disconnect(connection);
  }

  onRemoveConnection(connection: string) {
    // TODO: pop up a dialog confirming!
    this.electron.removeRedisConfig(connection);
  }

  //#endregion

}
