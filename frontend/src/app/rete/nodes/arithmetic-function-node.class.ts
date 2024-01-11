import { ClassicPreset as Classic } from "rete";

const socket = new Classic.Socket('socket');
export class ArithmeticFunctionNode extends Classic.Node {
    width = 180;
    height = 120;
    thingId = '';
    name: string;
    constructor(name: string) {
        super(name);
        this.name = name;
        this.addInput('in', new Classic.Input(socket));
        return this;
    }
}