import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ModalModule } from 'ngx-bootstrap/modal';
// If you use animations (recommended for ngx-bootstrap modals)
import { provideAnimations } from '@angular/platform-browser/animations';


bootstrapApplication(AppComponent, {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimations(), // For animations
    importProvidersFrom(ModalModule.forRoot())
  ]
});
