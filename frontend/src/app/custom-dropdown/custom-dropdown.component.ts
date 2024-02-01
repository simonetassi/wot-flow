import { Component, Input } from "@angular/core";
import { ClassicPreset } from "rete";

export class DropDownControl extends ClassicPreset.Control {
  constructor(public select: string[]) {
    super();
  }
}

@Component({
  selector: "app-custom-dropdown",
  templateUrl: './custom-dropdown.component.html',
})
export class DropDownComponent {
  @Input() data!: DropDownControl;
}

