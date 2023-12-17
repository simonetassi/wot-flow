import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomSocketComponent } from './customization/custom-socket/custom-socket.component';
import { CustomNodeComponent } from './customization/custom-node/custom-node.component';
import { CustomConnectionComponent } from './customization/custom-connection/custom-connection.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';


import { ReteModule } from 'rete-angular-plugin/14';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { ActionNodeComponent } from './customization/nodes/action-node/action-node.component';
import { PropertyNodeComponent } from './customization/nodes/property-node/property-node.component';
import { ThingNodeComponent } from './customization/nodes/thing-node/thing-node.component';
import { BasicFunctionNodeComponent } from './customization/nodes/basic-function-node/basic-function-node.component';
import { ThingExpandableComponent } from './thing-expandable/thing-expandable.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomSocketComponent,
    CustomNodeComponent,
    CustomConnectionComponent,
    ActionNodeComponent,
    PropertyNodeComponent,
    ThingNodeComponent,
    BasicFunctionNodeComponent,
    ThingExpandableComponent,
  ],
  imports: [BrowserModule, ReteModule, BrowserAnimationsModule, MatButtonModule, MatIconModule, MatSidenavModule,
    MatToolbarModule, MatMenuModule, MatListModule, MatExpansionModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
