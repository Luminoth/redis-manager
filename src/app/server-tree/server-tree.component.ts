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

  private reloadSubscription: Subscription;

  treeControl = new FlatTreeControl<RedisServerNode>(
    node => node.level,
    node => node.expandable
  );

  private transformer = (node: RedisServerConfig, level: number): RedisServerNode => {
    return {
      expandable: this.electron.redisConnections.has(node.name),
      name: node.name,
      level: level,
    };
  }

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => null);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  //#region Lifecycle

  constructor(private electron: AppElectronService,
    private redis: RedisService) {
    this.reloadSubscription = this.electron.reloadConfig$.subscribe(() => {
      this.dataSource.data = this.electron.config.redisConfig;
    });
  }

  ngOnInit() {
    this.dataSource.data = this.electron.config.redisConfig;
  }

  ngOnDestroy() {
    this.reloadSubscription.unsubscribe();
  }

  //#endregion

  hasChild = (_: number, node: RedisServerNode) => node.expandable;

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

}
