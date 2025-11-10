import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadingStrategyService } from './services/preloading-strategy.service';
import { httpInterceptors } from './models/application-configurations/http-interceptor';
import { translateModule } from './models/application-configurations/ngx-translate-config';
import { toasterModule } from './models/application-configurations/ngx-toastr-config';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TrialSiteEffects } from './store/trialsite/trialsite.effects';
import { TrialSiteReducer } from './store/trialsite/trialsite.reducer';
import { JwtInterceptorService } from './modules/auth/services/jwt-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    provideRouter(routes, withPreloading(PreloadingStrategyService)),
    provideHttpClient(withFetch()),
    importProvidersFrom(translateModule),
    toasterModule,
    provideAnimations(),
    provideStore({ 'trialSite': TrialSiteReducer }),
    provideEffects([TrialSiteEffects]),
    //provideExperimentalZonelessChangeDetection(); // Uncomment this line to enable zoneless change detection and remove zone.js from angular.json from polifill
  ]
};
