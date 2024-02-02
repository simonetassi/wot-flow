import { Component, Input } from "@angular/core";
import { ClassicPreset } from "rete";

export class CustomDropDownControl extends ClassicPreset.Control {
  value?: string;

  constructor(public select: string[]) {
    super();
  }

  setValue(value?: string): void {
    this.value = value;
    console.log(this.value);
  }

  change?: (value: string) => void;  
}

@Component({
  selector: "app-custom-dropdown",
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropDownComponent {
  @Input() data!: CustomDropDownControl;
  onChange(value: any){
    this.data.setValue(value.value);
  }
}

