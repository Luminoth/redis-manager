import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Subscription } from 'rxjs';

import { AppElectronService } from '../app-electron.service';
import { RedisService } from '../redis.service';
import { RedisServerConfig } from '../../../electron/config';

interface RedisServerNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-server-tree',
  templateUrl: './server-tree.component.html',
  styleUrls: ['./server-tree.component.scss']
})
export class ServerTreeComponent implements OnInit, OnDestroy {

  // TODO: look at the angular material dynamic data example
  // this should probably do something more like that
  // since it seems like it has a much cleaner way of connecting the data

  treeControl = new FlatTreeControl<RedisServerNode>(
    node => node.level,
    node => node.expandable
  );

  private transformFunction = (node: RedisServerConfig, level: number) => {
    return {
      expandable: this.electron.redisConnections.has(node.name),
      name: node.name,
      level: level,
    };
  }

  private _treeFlattener = new MatTreeFlattener(
    this.transformFunction, node => node.level, node => node.expandable, () => null);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this._treeFlattener);

  // subscriptions
  private _reloadSubscription: Subscription;

  //#region Lifecycle

  constructor(private electron: AppElectronService,
    private redis: RedisService) {
    this._reloadSubscription = this.electron.reloadConfig$.subscribe(() => {
      this.dataSource.data = this.electron.config.redisConfig;
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
