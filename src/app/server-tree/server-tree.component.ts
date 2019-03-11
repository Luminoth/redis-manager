import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

import { AppElectronService } from '../app-electron.service';
import { RedisServer } from '../redis-server';

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

  private transformer = (node: RedisServer, level: number) => {
    return {
      expandable: true,
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
    console.log(`Adding ${this.electron.config.redisConfig.length} redis servers...`);
    for (let redisConfig of this.electron.config.redisConfig) {
      this.dataSource.data.push({
        name: redisConfig.name,
        host: redisConfig.host,
        port: redisConfig.port
      });
    }
  }

  //#endregion

  hasChild = (_: number, node: RedisServerNode) => node.expandable;

}
