import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { addThingNode } from '../rete/default';
import { addActionNode } from '../rete/default';
import { addPropertyNode } from '../rete/default';
import { MatDialog } from '@angular/material/dialog';
import { ActionInputDialogComponent } from '../action-input-dialog/action-input-dialog.component';

interface Thing {
  id: string;
  title: string;
  actions: { [key: string]: string };
  properties: { [key: string]: string };
}

@Component({
  selector: 'thing-expandable-list',
  templateUrl: './thing-expandable.component.html',
  styleUrls: ['./thing-expandable.component.css']
})

export class ThingExpandableComponent implements OnInit {
  data: Thing[] = [];

  constructor(private dialog: MatDialog, private dataService: DataService) { }

  ngOnInit() {
    // http get from zion
    this.dataService.getThings().subscribe(
      (data) => {
        this.data = data;
      }
    );
  }

  trackByAction(index: number, action: [string, Object]): string {
    return action[0]; // Use a unique identifier from your action, adjust accordingly
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getObjectEntries(obj: any): [string, Object][] {
    return Object.entries(obj);
  }

  onAddThingNode(thingName: string, thingId: string) {
    // Call the addThingNode function from createEditor
    addThingNode(thingName, thingId);
  }

  onAddActionNode(action: [string, Object], thingId: string) {
    let keys: string[] = [];
  
    if (Object.keys(action[1]).includes("input")) {
      const input = (action[1] as any).input;
      keys = input && input.properties ? Object.keys(input.properties) : ["input"];
    } else if (Object.keys(action[1]).includes("uriVariables")) {
      keys = Object.keys((action[1] as any).uriVariables);
    }
  
    if (keys.length > 0) {
      this.openInputDialog(keys, action, thingId);
    } else {
      addActionNode(action, thingId);
    }
  }
  
  openInputDialog(keys: string[], action: [string, Object], thingId: string) {
    const values: { [key: string]: string } = {};
    keys.forEach(key => values[key] = '');
  
    const dialogRef = this.dialog.open(ActionInputDialogComponent, {
      data: { values: values, inputs: keys },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const results: Map<string, string> = new Map(Object.entries(result));
        addActionNode(action, thingId, results);
      }
    });
  }
  
  

  onAddPropertyNode(propertyName: string, thingId: string) {
    // Call the addPropertyNode function from createEditor
    addPropertyNode(propertyName, thingId);
  }
}
