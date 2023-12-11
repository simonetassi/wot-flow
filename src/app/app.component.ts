import { AfterViewInit, Component, ElementRef, Injector, ViewChild } from '@angular/core'

import { createEditor } from './rete'
import { DataService } from './data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'angular'
  @ViewChild('rete') container!: ElementRef<HTMLElement>

  constructor(private injector: Injector, private dataService: DataService) { }

  async ngAfterViewInit() {
    await createEditor(this.container.nativeElement, this.injector, this.dataService);
  }
}
