import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePage } from './pages/home/home.page';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DynamicPage } from './pages/dynamic/dynamic.page';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/dynamic/hero/hero.component';
import { ServiceItemComponent } from './components/dynamic/service-item/service-item.component';
import { TitleComponent } from './components/dynamic/title/title.component';
import { TextComponent } from './components/dynamic/text/text.component';
import { MapComponent } from './components/dynamic/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    LoadingComponent,
    NavbarComponent,
    DynamicPage,
    FooterComponent,
    HeroComponent,
    ServiceItemComponent,
    TitleComponent,
    TextComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
