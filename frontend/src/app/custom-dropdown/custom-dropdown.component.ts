import { Component, Input } from "@angular/core";
import { ClassicPreset } from "rete";

export class CustomDropDownControl extends ClassicPreset.Control {
  constructor(public select: string[]) {
    super();
  }
}

@Component({
  selector: "app-custom-dropdown",
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropDownComponent {
  @Input() data!: CustomDropDownControl;
}

