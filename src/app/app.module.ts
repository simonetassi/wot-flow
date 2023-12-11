import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomSocketComponent } from './customization/custom-socket/custom-socket.component';
import { CustomNodeComponent } from './customization/custom-node/custom-node.component';
import { CustomConnectionComponent } from './customization/custom-connection/custom-connection.component';

import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon';

import { ReteModule } from 'rete-angular-plugin/14';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CustomSocketComponent,
    CustomNodeComponent,
    CustomConnectionComponent,
  ],
  imports: [BrowserModule, ReteModule, BrowserAnimationsModule, MatButtonModule, MatIconModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
