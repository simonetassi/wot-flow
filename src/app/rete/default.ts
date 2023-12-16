import { ClassicPreset as Classic, ClassicPreset, GetSchemes, NodeEditor } from 'rete';
import { Injector } from '@angular/core';
import { Area2D, AreaExtensions, AreaPlugin } from 'rete-area-plugin';
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
  Presets,
} from 'rete-connection-plugin';

import {
  AngularPlugin,
  AngularArea2D,
  Presets as AngularPresets,
} from 'rete-angular-plugin/14';

import {
  DockPlugin,
  DockPresets
} from "rete-dock-plugin";

import {
  ContextMenuPlugin,
  ContextMenuExtra,
  Presets as ContextMenuPresets,
} from 'rete-context-menu-plugin';

import { DataService } from '../data.service';
import { restrictor } from 'rete-area-plugin/_types/extensions';
import { CustomNodeComponent } from '../customization/custom-node/custom-node.component';
import { ActionNodeComponent } from '../customization/nodes/action-node/action-node.component';
import { PropertyNodeComponent } from '../customization/nodes/property-node/property-node.component';
import { ThingNodeComponent } from '../customization/nodes/thing-node/thing-node.component';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

type Node = ThingNode | ActionNode | PropertyNode;
type Conn =
  | Connection<ThingNode, PropertyNode>
  | Connection<ThingNode, ActionNode>;
type Schemes = GetSchemes<Node, Conn>;

class Connection<A extends Node, B extends Node> extends Classic.Connection<
  A,
  B
> { }

class ThingNode extends Classic.Node {
  width = 180;
  height = 120;
  constructor(initial: string, id?: string) {
    super(initial);
    this.addInput('in', new Classic.Input(socket));
    this.addOutput('value', new Classic.Output(socket));
    return this;
  }
}

class PropertyNode extends Classic.Node {
  width = 180;
  height = 120;
  constructor(initial: string) {
    super(initial);
    this.addInput('in', new Classic.Input(socket));
    this.addOutput('value', new Classic.Output(socket));
    return this;
  }
}

class ActionNode extends Classic.Node {
  width = 180;
  height = 120;
  constructor(initial: string) {
    super(initial);
    this.addInput('in', new Classic.Input(socket));
    this.addOutput('value', new Classic.Output(socket));
    return this;
  }
}

type AreaExtra = Area2D<Schemes> | AngularArea2D<Schemes> | ContextMenuExtra;

const socket = new Classic.Socket('socket');
const editor = new NodeEditor<Schemes>();


export async function createEditor(container: HTMLElement, injector: Injector) {
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const angularRender = new AngularPlugin<Schemes, AreaExtra>({ injector });
  // context menu just for deletion
  const contextMenu = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([
    ]),
  });
  const dock = new DockPlugin<Schemes>();

  // nodes customization
  angularRender.addPreset(
    AngularPresets.classic.setup({
      customize: {
        node(context) {
          if (context.payload instanceof ActionNode) {
            return ActionNodeComponent;
          } else if (context.payload instanceof PropertyNode) {
            return PropertyNodeComponent;
          }
          return ThingNodeComponent;
        }
      },
    })
  );

  dock.addPreset(DockPresets.classic.setup({ area, size: 100, scale: 0.6 }));

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  editor.use(area);

  area.use(angularRender);
  area.use(connection);
  area.use(contextMenu);
  // area.use(dock);

  connection.addPreset(ConnectionPresets.classic.setup());

  angularRender.addPreset(AngularPresets.classic.setup());
  angularRender.addPreset(AngularPresets.contextMenu.setup());

  // http get from zion
  // dataService.getThings().subscribe(
  //   (data) => {
  //     data.forEach((element: any) => {
  //       dock.add(() => new ThingNode(element.title));

  //       Object.entries(element.actions).forEach((action: any) => {
  //         dock.add(() => new ActionNode(action[0]));
  //       });

  //       Object.entries(element.properties).forEach((property: any) => {
  //         dock.add(() => new PropertyNode(property[0]));
  //       });
  //     });
  //   }
  // );

  AreaExtensions.restrictor(area, {
    scaling: () => ({ min: 0.4, max: 1 }),
    translation: () => ({ left: 0, top: 0, right: 300, bottom: 300 })
  });

  const saveBtn = document.getElementById("saveBtn");
  saveBtn?.addEventListener('click', (event) => {
    createAndroidCode(editor.getNodes())
  })


  return {
    destroy: () => area.destroy()
  };
}

export async function addThingNode(thingName: string) {
  await editor.addNode(new ThingNode(thingName));
}

export async function addActionNode(actionName: string) {
  await editor.addNode(new ActionNode(actionName));
}

export async function addPropertyNode(propertyName: string) {
  await editor.addNode(new PropertyNode(propertyName));
}

function createAndroidCode(nodes: any) {
  console.log("createAndroidCode!");
 }