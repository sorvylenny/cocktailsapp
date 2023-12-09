import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './cocktails/pages/home/home.component';
import { ListCocktailsComponent } from './cocktails/pages/list-cocktails/list-cocktails.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './cocktails/pages/material/material.module';
import { LoginComponent } from './cocktails/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompleteCocktailsComponent } from './cocktails/pages/complete-cocktails/complete-cocktails.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListCocktailsComponent,
    LoginComponent,
    CompleteCocktailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
