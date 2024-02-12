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
    // if input is needed, insert it from dialog
    if (Object.keys(action[1]).includes("input")) {
      // input case
      const input = (new Map(Object.entries(action[1]))).get("input");
      // if (Object.keys(input).includes("properties")) {
      //   const properties = new Map(Object.entries((input))).get("properties");
      //   console.log(properties);
      //   const map = Object.keys(properties)
      //   // properties.forEach((value: boolean, key: string) => {
      //   //   console.log(key, value);
      //   // });

      // }
      const values: { [key: string]: string } = {};
      values["input"] = '';
      const dialogRef = this.dialog.open(ActionInputDialogComponent, {
        data: { values: values, inputs: ["input"] },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result);
          const results: Map<string, string> = new Map(Object.entries(result))
          addActionNode(action, thingId, results);
        }
      });
    } else if (Object.keys(action[1]).includes("uriVariables")) {
      // uriVariables case
      const uriVariables = (new Map(Object.entries(action[1]))).get("uriVariables");
      const values: { [key: string]: string } = {};
      // Initialize the values object with empty strings for each input
      Object.keys(uriVariables).forEach(input => {
        values[input] = '';
      });
      const dialogRef = this.dialog.open(ActionInputDialogComponent, {
        data: { values: values, inputs: Object.keys(uriVariables) },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result);
          const results: Map<string, string> = new Map(Object.entries(result))
          addActionNode(action, thingId, results);
        }
      });
    } else {
      // Call the addActionNode function from createEditor
      addActionNode(action, thingId);
    }
  }

  onAddPropertyNode(propertyName: string, thingId: string) {
    // Call the addPropertyNode function from createEditor
    addPropertyNode(propertyName, thingId);
  }
}
