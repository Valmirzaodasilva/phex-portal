import { ApplicationConfig, APP_INITIALIZER, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { PortalService } from './core/services/portal.service';
import { SswService } from './core/services/ssw.service';
import { ConfigService } from './core/services/config.service';
import { forkJoin, catchError, of } from 'rxjs';

function initializeApp(
  portalService: PortalService,
  sswService: SswService,
  configService: ConfigService
) {
  return () =>
    forkJoin({
      menus: portalService.loadMenus().pipe(catchError(() => of({ response: [], success: false }))),
      sswMenus: sswService.loadSswMenus().pipe(catchError(() => of({ response: [], success: false }))),
      config: configService.loadConfig().pipe(catchError(() => of({ response: {}, success: false }))),
    }).toPromise();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [PortalService, SswService, ConfigService],
      multi: true,
    },
  ],
};
