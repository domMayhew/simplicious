import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAlternativeButton } from './ui/add-alternative/add-alternative.component';
import { IngredientTokenComponent } from './ui/tokens/ingredient-token/ingredient-token.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FullGridWidthComponent } from './ui/full-grid-width/full-grid-width.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AddAlternativeButton,
    IngredientTokenComponent,
    WelcomeComponent,
    BrowserAnimationsModule,
    MatButtonModule,
    FullGridWidthComponent
  ],
  providers: [RouterModule,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
