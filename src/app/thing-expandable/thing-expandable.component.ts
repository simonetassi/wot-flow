import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DataService } from '../data.service';

import { addThingNode } from '../rete/default';
import { addActionNode } from '../rete/default';
import { addPropertyNode } from '../rete/default';

interface YourDataType {
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
  data: YourDataType[] = []; // Replace YourDataType with the actual type of your data

  constructor(private sanitizer: DomSanitizer, private dataService: DataService) { }

  ngOnInit() {
    // http get from zion
    this.dataService.getThings().subscribe(
      (data) => {
        this.data = data;
      }
    );
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  onAddThingNode(thingName: string) {
    // Call the addThingNode function from createEditor
    addThingNode(thingName);
  }

  onAddActionNode(actionName: string) {
    // Call the addThingNode function from createEditor
    addActionNode(actionName);
  }

  onAddPropertyNode(propertyName: string) {
    // Call the addThingNode function from createEditor
    addPropertyNode(propertyName);
  }
}
