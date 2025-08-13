import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

bootstrapApplication(App, {
  ...appConfig, // Desestructuramos para mantener la config original
  providers: [
    ...(appConfig.providers || []), // Mantenemos los providers existentes
    provideHttpClient(),
    DatePipe
  ]
}).catch((err) => console.error(err));