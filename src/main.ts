/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Import the new provideHttpClient function
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Use provideHttpClient to configure the HTTP client
    ...appConfig.providers // Spread other providers from your app config
  ]
})
  .catch((err) => console.error(err));
