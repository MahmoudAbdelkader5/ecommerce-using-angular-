import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // Import AppComponent

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [] 
})
export class AppModule { }

// Bootstrap the standalone AppComponent
bootstrapApplication(AppComponent, {
  providers: []
}).catch(err => console.error(err));