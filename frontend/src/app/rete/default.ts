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
import { ActionNodeComponent } from '../customization/nodes/action-node/action-node.component';
import { PropertyNodeComponent } from '../customization/nodes/property-node/property-node.component';
import { ThingNodeComponent } from '../customization/nodes/thing-node/thing-node.component';
import { BasicFunctionNodeComponent } from '../customization/nodes/basic-function-node/basic-function-node.component';
import { ArithmeticFunctionComponent } from '../customization/nodes/arithmetic-function-node /arithmetic-function-node.component';
import { ValidationAlertService } from '../validation-alert/validation-alert.service';
import { ThingNode } from './nodes/thing-node.class';
import { ActionNode } from './nodes/action-node.class';
import { PropertyNode } from './nodes/property-node.class';
import { BasicFunctionNode } from './nodes/basic-function-node.class';
import { ArithmeticFunctionNode } from './nodes/arithmetic-function-node.class';

type Node = ThingNode | ActionNode | PropertyNode | BasicFunctionNode | ArithmeticFunctionNode;
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

type AreaExtra = Area2D<Schemes> | AngularArea2D<Schemes> | ContextMenuExtra;

const socket = new Classic.Socket('socket');
const editor = new NodeEditor<Schemes>();
const arrange = new AutoArrangePlugin<Schemes>();
arrange.addPreset(ArrangePresets.classic.setup());

export async function createEditor(container: HTMLElement, injector: Injector, validationAlertService: ValidationAlertService) {
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
          } else if (context.payload instanceof ArithmeticFunctionNode) {
            return ArithmeticFunctionComponent;
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

  // manage events
  editor.addPipe(context => {
    if (context.type == 'connectioncreated') {
      let connections = editor.getConnections();
      let nodes = editor.getNodes();
      let last = connections[(connections.length - 1)];
      let srcNode = nodes.find(node => last.source == node.id);
      let targetNode = nodes.find(node => last.target == node.id);

      // using ${connection.length} as random value for the input/output key
      // TODO implement smarter solution
      if (srcNode instanceof ThingNode) {
        srcNode.addOutput(`value${connections.length}`, new Classic.Output(socket));
        area.update('node', srcNode.id);
      } else if (targetNode instanceof ArithmeticFunctionNode) {
        targetNode.addInput(`in${connections.length}`, new Classic.Input(socket));
        area.update('node', targetNode.id);
      }
    } else if (context.type === 'connectioncreate') {
      if (!canCreateConnection(context.data)) {
        validationAlertService.showAlert({ type: 'danger', message: `This connection is NOT possible` });
        return;
      }
    }
    return context
  })

  // area constraints
  AreaExtensions.restrictor(area, {
    scaling: () => ({ min: 0.4, max: 1 }),
    translation: () => ({ left: 0, top: 0, right: 300, bottom: 300 })
  });

  return {
    destroy: () => area.destroy(),
  };
}

function canCreateConnection(connection: Conn): boolean {
  let nodes = editor.getNodes();
  let srcNode = nodes.find(node => connection.source == node.id);
  let targetNode = nodes.find(node => connection.target == node.id);
  // Thing -> Action ||  Thing -> Property
  return ((srcNode instanceof ThingNode) && ((targetNode instanceof ActionNode) || (targetNode instanceof PropertyNode)))
    // Action -> BasicFunction || Property -> BasicFunction
    || (((srcNode instanceof ActionNode) || (srcNode instanceof PropertyNode)) && (targetNode instanceof BasicFunctionNode))
    // BasicFunction -> ArithmeticFunction
    || ((srcNode instanceof BasicFunctionNode) && (targetNode instanceof ArithmeticFunctionNode));
}


// add node function (for sidebar buttons)
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

export async function addArithmeticFunctionNode(name: string) {
  await editor.addNode(new ArithmeticFunctionNode(name));
}


function getThingNodes(nodes: Node[]) {
  return nodes.filter(node => node instanceof ThingNode) || null;
}

function getArithmeticFunctionNodes(nodes: Node[]) {
  return nodes.filter(node => node instanceof ArithmeticFunctionNode) || null;
}

function getNodeById(nodes: Node[], id: string) {
  return nodes.find(node => node.id === id) || null;
}

// check that editor is not empty before code generation
export function editorIsEmpty() {
  return editor.getNodes().length == 0;
}

function nextIsArithmeticFunction(node: BasicFunctionNode, connections: Conn[], nodes: Node[]) {
  const c = connections.find(conn => conn.source === node.id) || null;
  if ((c != null) && (getNodeById(nodes, c.target) instanceof ArithmeticFunctionNode)) {
    const connectedNode = getNodeById(nodes, c.target);
    return [true, connectedNode!.label];
  } else {
    return [false, ''];
  }
}

// recursive function to inspect next node in the flow
function inspectNextNode(currentId: string, nodes: Node[], connections: Conn[], code: string, name: string): string {
  const conns = connections.filter(conn => conn.source === currentId);

  for (const c of conns) {
    const connectedNode = getNodeById(nodes, c.target);

    if (connectedNode == null) {
      console.log("ERROR! No more connections");
    } else if (connectedNode instanceof ActionNode) {
      code += `ConsumedThingAction action_${connectedNode.label} = consumedThing_${name}.getAction("${connectedNode.label}");`;
    } else if (connectedNode instanceof PropertyNode) {
      code += `ConsumedThingProperty property_${connectedNode.label} = consumedThing_${name}.getProperty("${connectedNode.label}");`;
    } else if (connectedNode.label == 'invokeAction') {
      code += `action_${name}.invoke();`;
    } else if (connectedNode.label == 'observeProperty') {
      const [arithmetic, label] = nextIsArithmeticFunction(connectedNode, connections, nodes);
      code += `String string_${name} = property_${name}.read().get().toString();`
      if (arithmetic) {
        code += `Float numeric_${name} = instance.isNumeric(string_${name});
                 if(numeric_${name} != -777){
                    ${label}_properties.add(numeric_${name});
                 } else {
                  System.out.println("ERROR, ${name} is not a numeric property!");
                 }`;
      } else {
        code += `properties.put(${name}, string_${name});
        System.out.println(string_${name});`;
      }
    }

    code = inspectNextNode(connectedNode!.id, nodes, connections, code, connectedNode!.label);
  }

  return code;
}


export function createAndroidCode(routineName: string, dataService: DataService) {
  const nodes = editor.getNodes();
  const connections = editor.getConnections(); 

  let code = `import com.example.wot_servient.wot.thing.ConsumedThing;
  import com.example.wot_servient.wot.thing.action.ConsumedThingAction;
  import com.example.wot_servient.wot.thing.property.ConsumedThingProperty;`;
  let thingIds: string[] = [];

  const arithmeticFunctionNodes = getArithmeticFunctionNodes(nodes);
  const thingNodes = getThingNodes(nodes);

  code += `Map properties = new HashMap();`;

  if ((arithmeticFunctionNodes.length != 0) && (thingNodes.length != 0)) {
    for (let n of arithmeticFunctionNodes) {
      code += `List ${n.label}_properties = new ArrayList();`;
    }
  }

  // check if there is a thing node in the editor
  if (thingNodes.length != 0) {
    for (let n of thingNodes) {
      const thingId: string = n.thingId;
      thingIds.push(thingId);
      let thingName = n.label.replace(/[^A-Z0-9]+/ig, "_");

      const toInject = inspectNextNode(n.id, nodes, connections, ``, thingName);

      code += `ConsumedThing consumedThing_${thingName} = consumedThingsMap.get("${thingId}");
              if (consumedThing_${thingName} != null) {
                    ${toInject}
              } else {
                  System.out.println("RUNTIME ERROR: Thing not found.");
              }
            `
    }
  } else {
    console.log("ERROR! No Thing Nodes in the editor")
  }

  if ((arithmeticFunctionNodes.length != 0) && (thingNodes.length != 0)) {
    for (let n of arithmeticFunctionNodes) {
      // might not work properly: consider using an if else for every type of operation
      code += `Float ${n.label} = instance.${n.label}(${n.label}_properties);`;
    }
  }

  const routine = new Routine("", routineName, code, JSON.stringify(thingIds));
  dataService.postRoutine(routine).subscribe(response => {
    location.reload();
  });

}