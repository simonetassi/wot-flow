import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DataService } from '../data.service';

import { addThingNode } from '../rete/default';
import { addActionNode } from '../rete/default';
import { addPropertyNode } from '../rete/default';

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

  onAddThingNode(thingName: string, thingId: string) {
    // Call the addThingNode function from createEditor
    addThingNode(thingName, thingId);
  }

  onAddActionNode(actionName: string, thingId: string) {
    // Call the addActionNode function from createEditor
    addActionNode(actionName, thingId);
  }

  onAddPropertyNode(propertyName: string, thingId: string) {
    // Call the addPropertyNode function from createEditor
    addPropertyNode(propertyName, thingId);
  }
}
