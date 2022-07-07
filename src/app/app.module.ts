import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarModule } from './components/navbar/navbar.module';
import { FooterComponent } from './components/footer/footer.component';
import { FooterModule } from './components/footer/footer.module';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule } from './components/carousel/carousel.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    FooterModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
