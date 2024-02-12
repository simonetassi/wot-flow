import { ClassicPreset as Classic } from "rete";

const socket = new Classic.Socket('socket');
export class ActionNode extends Classic.Node {
    width = 180;
    height = 120;
    thingId: string;
    name: string;
    _values?: Map<string, string>;
    constructor(name: string, thingId: string) {
        super(name);
        this.name = name;
        this.thingId = thingId;
        this.addInput('in', new Classic.Input(socket));
        this.addOutput('value', new Classic.Output(socket));
        return this;
    }
    
    setValues(values: Map<string, string>){
        this._values = values
        console.log(this._values)
    }

    get values() : Map<string, string> {
        return this._values!;
    }
}