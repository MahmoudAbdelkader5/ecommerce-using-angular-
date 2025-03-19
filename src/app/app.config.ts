import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes'; // Assuming your routes are defined in app.routes.ts
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), // Enable Zone.js change detection with event coalescing
    provideRouter(routes, withComponentInputBinding()) // Enable component input binding for route data
  ]
};