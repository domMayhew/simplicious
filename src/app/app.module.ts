import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAlternativeButton } from './ui/add-alternative/add-alternative.component';
import { OneOfToken } from './ui/tokens/one-of-token/one-of-token.component';
import { IngredientTokenComponent } from './ui/tokens/ingredient-token/ingredient-token.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AddAlternativeButton,
    OneOfToken,
    IngredientTokenComponent,
    WelcomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
