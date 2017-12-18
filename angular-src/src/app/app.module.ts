import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  //all components here
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  //all modules here
  imports: [
    BrowserModule
  ],
  //all services here
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
