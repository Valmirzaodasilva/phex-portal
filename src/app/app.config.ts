import { ApplicationConfig, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfigService } from './core/services/config.service';
import { routes } from './app.routes';

function initApp(): () => Promise<void> {
  const config = inject(ConfigService);
  return () => config.load();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
    },
  ],
};
