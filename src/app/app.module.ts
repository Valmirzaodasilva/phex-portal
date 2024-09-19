import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DynamicPage } from './pages/dynamic/dynamic.page';
import { FooterComponent } from './components/footer/footer.component';
import { ServiceCardComponent } from './components/dynamic/service-card/service-card.component';
import { TitleComponent } from './components/dynamic/title/title.component';
import { TextComponent } from './components/dynamic/text/text.component';
import { MapComponent } from './components/dynamic/map/map.component';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import { BrazilMapComponent } from './components/brazil-map/brazil-map.component';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { BannerComponent } from './components/dynamic/banner/banner.component';
import { ItemInformationComponent } from './components/dynamic/item-information/item-information.component';
import { PrincipleCardComponent } from './components/dynamic/principle-card/principle-card.component';
import { SearchSSWPage } from './pages/search-ssw/search-ssw.page';
import { InputsComponent } from './components/inputs/inputs.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPage,
    LoadingComponent,
    NavbarComponent,
    DynamicPage,
    SearchSSWPage,
    FooterComponent,
    ServiceCardComponent,
    TitleComponent,
    TextComponent,
    MapComponent,
    ItemInformationComponent,
    PrincipleCardComponent,
    DynamicComponent,
    BrazilMapComponent,
    BannerComponent,
    InputsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
