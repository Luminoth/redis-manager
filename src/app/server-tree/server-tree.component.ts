import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

import { AppElectronService } from '../app-electron.service';
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
export class ServerTreeComponent implements OnInit {

  private transformer = (node: RedisServerConfig, level: number) => {
    return {
      expandable: this.electron.redisConnections.has(node.name),
      name: node.name,
      level: level,
    };
  }

  treeControl: FlatTreeControl<RedisServerNode> = new FlatTreeControl<RedisServerNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => null);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  //#region Lifecycle

  constructor(private electron: AppElectronService) {
  }

  ngOnInit() {
    this.dataSource.data = this.electron.config.redisConfig;
  }

  //#endregion

  hasChild = (_: number, node: RedisServerNode) => node.expandable;

  onConnect(connection: string) {
    console.log(`TODO: connect ${connection}`);
  }

  onDisconnect(connection: string) {
    console.log(`TODO: disconnect ${connection}`);
  }

  onRemoveConnection(connection: string) {
    // TODO: pop up a dialog confirming!
    console.log(`TODO: remove connection ${connection}`);
  }

}
