import { AfterViewInit, Component, ElementRef, Injector, ViewChild, Renderer2, ViewContainerRef } from '@angular/core'

import { createEditor } from './rete'
import { addArithmeticFunctionNode, addBasicFunctionNode, addInvokeActionNode, addObservePropertyNode } from './rete/default'
import { ValidationAlertService } from './validation-alert/validation-alert.service'
import { Alert } from './validation-alert/validation-alert.interface'
import { ValidationAlertComponent } from './validation-alert/validation-alert.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'angular'
  @ViewChild('rete') container!: ElementRef<HTMLElement>

  constructor(private injector: Injector, private validationAlertService: ValidationAlertService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(){
    this.validationAlertService.alertObservable$.forEach(alert => this.showValidationAlert(alert));
  }

  showValidationAlert(alert: any) {
    // Create the component
    const componentRef = this.viewContainerRef.createComponent(ValidationAlertComponent);

    // Set the input property (alert) of the component
    componentRef.instance.alert = alert;

    // Append the component to the DOM
    document.getElementById("alerts")!.prepend(componentRef.location.nativeElement);
  }

  async ngAfterViewInit() {
    await createEditor(this.container.nativeElement, this.injector, this.validationAlertService);
  }

  onAddInvokeActionNode(){
    addInvokeActionNode();
  }

  onAddObservePropertyNode(){
    addObservePropertyNode();
  }

  onAddBasicFunctionNode(name: string) {
    addBasicFunctionNode(name);
  }
  onAddArithmeticFunctionNode(name: string) {
    addArithmeticFunctionNode(name);
  }
}
