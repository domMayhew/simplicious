import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAlternativeButton } from './ui/add-alternative/add-alternative.component';
import { OneOfToken } from './ui/one-of-token/one-of-token.component';

@NgModule({
  declarations: [
    AppComponent,
    OneOfToken,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AddAlternativeButton
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
