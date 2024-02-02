import { ClassicPreset as Classic } from "rete";
import { CustomDropDownControl } from "src/app/custom-dropdown/custom-dropdown.component";

const socket = new Classic.Socket('socket');
export class ActionInputNode extends Classic.Node<
    { in: Classic.Socket },
    { value: Classic.Socket },
    { value: CustomDropDownControl }>
{
    width = 180;
    height = 120;
    thingId: string;
    name: string;
    constructor(action: [string, Object], thingId: string, change?: void) {
        super(action[0]);
        this.name = action[0];
        this.thingId = thingId;
        this.addInput('in', new Classic.Input(socket));
        this.addOutput('value', new Classic.Output(socket));
        const input = Object.entries(action[1]).find(pair => pair[0] == "input");
        const e: string[] = Object.values(input![1])[0] as string[];
        this.addControl('value', new CustomDropDownControl(e));
    }

    get val(){
        return this.controls.value.value;
    }
}