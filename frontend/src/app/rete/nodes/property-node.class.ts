import { ClassicPreset as Classic } from "rete";

const socket = new Classic.Socket('socket');
export class PropertyNode extends Classic.Node {
    width = 180;
    height = 120;
    thingId: string;
    name: string;
    constructor(name: string, thingId: string) {
        super(name);
        this.name = name;
        this.thingId = thingId;
        this.addInput('in', new Classic.Input(socket));
        this.addOutput('value', new Classic.Output(socket));
        return this;
    }
}