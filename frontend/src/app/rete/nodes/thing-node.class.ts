import { ClassicPreset as Classic } from "rete";

export class ThingNode extends Classic.Node {
  width = 180;
  height = 120;
  thingId: string;
  name: string;
  constructor(name: string, thingId: string) {
    super(name);
    this.name = name;
    this.thingId = thingId;
    this.addOutput('value', new Classic.Output(new Classic.Socket('socket')));
    return this;
  }
}