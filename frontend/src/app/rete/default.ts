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
  ContextMenuPlugin,
  ContextMenuExtra,
  Presets as ContextMenuPresets,
} from 'rete-context-menu-plugin';

import {
  AutoArrangePlugin,
  Presets as ArrangePresets
} from "rete-auto-arrange-plugin";

import { DataService, Routine } from '../data.service';
import { restrictor } from 'rete-area-plugin/_types/extensions';
import { CustomNodeComponent } from '../customization/custom-node/custom-node.component';
import { ActionNodeComponent } from '../customization/nodes/action-node/action-node.component';
import { PropertyNodeComponent } from '../customization/nodes/property-node/property-node.component';
import { ThingNodeComponent } from '../customization/nodes/thing-node/thing-node.component';
import { BasicFunctionNodeComponent } from '../customization/nodes/basic-function-node/basic-function-node.component';
import { connection } from 'rete-area-3d-plugin/_types/extensions/forms';

type Node = ThingNode | ActionNode | PropertyNode | BasicFunctionNode;
type Conn =
  | Connection<ThingNode, PropertyNode>
  | Connection<ThingNode, ActionNode>
  | Connection<PropertyNode, BasicFunctionNode>
  | Connection<ActionNode, BasicFunctionNode>;
type Schemes = GetSchemes<Node, Conn>;

class Connection<A extends Node, B extends Node> extends Classic.Connection<
  A,
  B
> { }

class ThingNode extends Classic.Node {
  width = 180;
  height = 120;
  thingId: string;
  constructor(initial: string, thingId: string) {
    super(initial);
    this.thingId = thingId;
    this.addInput('in', new Classic.Input(socket));
    this.addOutput('value', new Classic.Output(socket));
    return this;
  }
}

class ActionNode extends Classic.Node {
  width = 180;
  height = 120;
  thingId: string;
  constructor(initial: string, thingId: string) {
    super(initial);
    this.thingId = thingId;
    this.addInput('in', new Classic.Input(socket));
    this.addOutput('value', new Classic.Output(socket));
    return this;
  }
}

class PropertyNode extends Classic.Node {
  width = 180;
  height = 120;
  thingId: string;
  constructor(initial: string, thingId: string) {
    super(initial);
    this.thingId = thingId;
    this.addInput('in', new Classic.Input(socket));
    this.addOutput('value', new Classic.Output(socket));
    return this;
  }
}


class BasicFunctionNode extends Classic.Node {
  width = 180;
  height = 120;
  thingId = 0;
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
const arrange = new AutoArrangePlugin<Schemes>();
arrange.addPreset(ArrangePresets.classic.setup());

export async function createEditor(container: HTMLElement, injector: Injector) {
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const angularRender = new AngularPlugin<Schemes, AreaExtra>({ injector });
  // context menu just for deletion
  const contextMenu = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([
    ]),
  });

  // nodes customization
  angularRender.addPreset(
    AngularPresets.classic.setup({
      customize: {
        node(context) {
          if (context.payload instanceof ActionNode) {
            return ActionNodeComponent;
          } else if (context.payload instanceof PropertyNode) {
            return PropertyNodeComponent;
          } else if (context.payload instanceof BasicFunctionNode) {
            return BasicFunctionNodeComponent;
          }
          return ThingNodeComponent;
        }
      },
    })
  );

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  editor.use(area);

  area.use(angularRender);
  area.use(connection);
  area.use(contextMenu);

  connection.addPreset(ConnectionPresets.classic.setup());

  angularRender.addPreset(AngularPresets.classic.setup());
  angularRender.addPreset(AngularPresets.contextMenu.setup());

  AreaExtensions.restrictor(area, {
    scaling: () => ({ min: 0.4, max: 1 }),
    translation: () => ({ left: 0, top: 0, right: 300, bottom: 300 })
  });

  return {
    destroy: () => area.destroy()
  };
}

export async function addThingNode(thingName: string, thingId: string) {
  await editor.addNode(new ThingNode(thingName, thingId));
}

export async function addActionNode(actionName: string, thingId: string) {
  await editor.addNode(new ActionNode(actionName, thingId));
}

export async function addPropertyNode(propertyName: string, thingId: string) {
  await editor.addNode(new PropertyNode(propertyName, thingId));
}

export async function addBasicFunctionNode(name: string) {
  await editor.addNode(new BasicFunctionNode(name));
}

function getConnectedNode(currentId: string, nodes: Node[], connections: Conn[]) {
  const c = connections.find(conn => conn.source === currentId) || undefined;
  if (c) {
    return getNodeById(nodes, c.target);
  } else {
    return null;
  }
}

function getFirstThingNode(nodes: Node[]) {
  return nodes.find(node => node instanceof ThingNode) || null;
}

function getNodeById(nodes: Node[], id: string) {
  return nodes.find(node => node.id === id) || null;
}

function inspectNextNode(currentId: string, nodes: Node[], connections: Conn[], code: string): string {
  const c = connections.find(conn => conn.source === currentId) || undefined;
  if (c) {
    const connectedNode = getNodeById(nodes, c.target);
    if (connectedNode == null) {
      console.log("ERROR! No more connections");
    } else if (connectedNode instanceof ActionNode) {
      code += `ConsumedThingAction action = consumedThing.getAction("${connectedNode.label}");`;
    } else if (connectedNode instanceof PropertyNode) {
      code += `ConsumedThingProperty property = consumedThing.getProperty("${connectedNode.label}");`;
    } else if (connectedNode.label == 'invokeAction') {
      code += `action.invoke();`
    } else if (connectedNode.label == 'observeProperty') {
      code += `property.read();`
    }
    return inspectNextNode(connectedNode!.id, nodes, connections, code);
  } else {
    return code;
  }
}

export function createAndroidCode(routineName: string, dataService: DataService) {
  const nodes = editor.getNodes();
  const connections = editor.getConnections();

  // TODO quando verranno aggiunte operazioni algebriche
  // prima di tutto controllare se ci sono operazioni algebriche
  // se si passare l'handling operaz algebrica a funz dedicata
  // altrimenti creare qui codice semplice (thing-property/thing-action)  

  let code = ``;

  // start from thing node
  const node = getFirstThingNode(nodes);
  code += ``

  // check if there is a thing node in the editor
  if (node != null) {
    const thingId = node.thingId;
    code += `ConsumedThing consumedThing = consumedThings.get("${thingId}");`

    // const connectedNode = getConnectedNode(node.id, nodes, connections);
    code = inspectNextNode(node.id, nodes, connections, code);
  } else {
    console.log("ERROR! No Thing Nodes in the editor")
  }

  const routine = new Routine("", routineName, code)
  dataService.postRoutine(routine).subscribe(response => {
    location.reload();
  });
}