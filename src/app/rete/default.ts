import { ClassicPreset as Classic, GetSchemes, NodeEditor } from 'rete';
import { Injector } from '@angular/core';
import { Area2D, AreaExtensions, AreaPlugin } from 'rete-area-plugin';
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from 'rete-connection-plugin';

import {
  AngularPlugin,
  AngularArea2D,
  Presets as AngularPresets,
} from 'rete-angular-plugin/14';

import {
  ContextMenuPlugin,
  ContextMenuExtra,
  Presets as ContextMenuPresets,
} from 'rete-context-menu-plugin';

import {
   DockPlugin,
   DockPresets 
} from "rete-dock-plugin";

import { DataService } from '../data.service';

type Node = NumberNode | AddNode;
type Conn =
  | Connection<NumberNode, AddNode>
  | Connection<AddNode, AddNode>
  | Connection<AddNode, NumberNode>
  | Connection<ThingNode, PropertyNode>
  | Connection<ThingNode, ActionNode>;
type Schemes = GetSchemes<Node, Conn>;

class Connection<A extends Node, B extends Node> extends Classic.Connection<
  A,
  B
> { }

class NumberNode extends Classic.Node {
  constructor(initial: number, change?: (value: number) => void) {
    super('Number');

    this.addOutput('value', new Classic.Output(socket, 'Number'));
    this.addControl(
      'value',
      new Classic.InputControl('number', { initial, change })
    );
  }
}

class AddNode extends Classic.Node {
  constructor() {
    super('Add');

    this.addInput('a', new Classic.Input(socket, 'A'));
    this.addInput('b', new Classic.Input(socket, 'B'));
    this.addOutput('value', new Classic.Output(socket, 'Number'));
    this.addControl(
      'result',
      new Classic.InputControl('number', { initial: 0, readonly: true })
    );
  }
}

class ThingNode extends Classic.Node {
  width = 180;
  height = 120;

  constructor(initial: string, id?: string) {
    super("Thing: " + initial);

    this.addInput('in', new Classic.Input(socket));
    this.addOutput('value', new Classic.Output(socket));
  }
}

class PropertyNode extends Classic.Node {
  width = 180;
  height = 120;

  constructor(initial: string) {
    super("Property: " + initial);

    this.addInput('in', new Classic.Input(socket));
    this.addOutput('value', new Classic.Output(socket));
  }
}

class ActionNode extends Classic.Node {
  width = 180;
  height = 120;

  constructor(initial: string) {
    super("Action: " + initial);

    this.addInput('in', new Classic.Input(socket));
    this.addOutput('value', new Classic.Output(socket));
  }
}

type AreaExtra = Area2D<Schemes> | AngularArea2D<Schemes> | ContextMenuExtra;

const socket = new Classic.Socket('socket');



export async function createEditor(container: HTMLElement, injector: Injector, dataService: DataService) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();

  const angularRender = new AngularPlugin<Schemes, AreaExtra>({ injector });

  const dock = new DockPlugin<Schemes>();

  const contextMenu = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([
      ['Number', () => new NumberNode(1)],
      ['Add', () => new AddNode()],
    ]),
  });

  dataService.getThings().subscribe(
    (data) => {
      console.log(data);
    }
  );

  dock.addPreset(DockPresets.classic.setup({ area, size: 100, scale: 0.6 }));

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  editor.use(area);

  area.use(angularRender);

  area.use(connection);
  area.use(contextMenu);

  area.use(dock);

  connection.addPreset(ConnectionPresets.classic.setup());

  angularRender.addPreset(AngularPresets.classic.setup());
  angularRender.addPreset(AngularPresets.contextMenu.setup());

  dock.add(() => new ThingNode("Sensor"));
  dock.add(() => new ThingNode("Gas Sensor"));
  dock.add(() => new ActionNode("openDoor()"));
  dock.add(() => new ActionNode("getTemperature()"));

  AreaExtensions.zoomAt(area, editor.getNodes());

  const selector = AreaExtensions.selector();
  const accumulating = AreaExtensions.accumulateOnCtrl();

  AreaExtensions.selectableNodes(area, selector, { accumulating });

  return {
    destroy: () => area.destroy(),
  };
}
