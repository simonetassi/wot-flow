import { AfterViewInit, Component, ElementRef, Injector, ViewChild, Renderer2 } from '@angular/core'

import { createEditor } from './rete'
import { addBasicFunctionNode } from './rete/default'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'angular'
  @ViewChild('rete') container!: ElementRef<HTMLElement>

  constructor(private injector: Injector) { }

  async ngAfterViewInit() {
    await createEditor(this.container.nativeElement, this.injector);
  }

  onAddBasicFunctionNode(name: string) {
    addBasicFunctionNode(name);
  }
}
