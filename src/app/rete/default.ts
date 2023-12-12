import { ClassicPreset as Classic, ClassicPreset, GetSchemes, NodeEditor } from 'rete';
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
  DockPlugin,
  DockPresets
} from "rete-dock-plugin";

import { DataService } from '../data.service';
import { restrictor } from 'rete-area-plugin/_types/extensions';

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
    super("Thing: " + initial);

    this.addInput('in', new Classic.Input(socket));
    this.addOutput('value', new Classic.Output(socket));
    return this;
  }
}

class PropertyNode extends Classic.Node {
  width = 180;
  height = 120;

  constructor(initial: string) {
    super("Property: " + initial);

    this.addInput('in', new Classic.Input(socket));
    this.addOutput('value', new Classic.Output(socket));
    return this;
  }
}

class ActionNode extends Classic.Node {
  width = 180;
  height = 120;

  constructor(initial: string) {
    super("Action: " + initial);

    this.addInput('in', new Classic.Input(socket));
    this.addOutput('value', new Classic.Output(socket));
    return this;
  }
}

type AreaExtra = Area2D<Schemes> | AngularArea2D<Schemes>;

const socket = new Classic.Socket('socket');

export async function createEditor(container: HTMLElement, injector: Injector, dataService: DataService) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();

  const angularRender = new AngularPlugin<Schemes, AreaExtra>({ injector });

  const dock = new DockPlugin<Schemes>();

  dock.addPreset(DockPresets.classic.setup({ area, size: 100, scale: 0.6 }));

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  editor.use(area);

  area.use(angularRender);

  area.use(connection);

  area.use(dock);

  connection.addPreset(ConnectionPresets.classic.setup());

  angularRender.addPreset(AngularPresets.classic.setup());

  // TODO move in another file

  dataService.getThings().subscribe(
    (data) => {
      data.forEach((element: any) => {
        dock.add(() => new ThingNode(element.title));

        Object.entries(element.actions).forEach((action: any) => {
          dock.add(() => new ActionNode(action[0]));
        });

        Object.entries(element.properties).forEach((property: any) => {
          dock.add(() => new PropertyNode(property[0]));
        });
      });
    }
  );
  // TODO end

  AreaExtensions.restrictor(area, {
    scaling: () => ({ min: 0.4, max: 1 }),
    translation: () => ({ left: 0, top: 0, right: 300, bottom: 300 })
  });

  return {
    destroy: () => area.destroy()
  };
}
