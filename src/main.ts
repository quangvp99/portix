import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from '@app/app.component';
import { routes } from '@app/app.routes';
import { authInterceptor } from '@app/core/interceptors/auth.interceptor';
import { errorInterceptor } from '@app/core/interceptors/error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    provideAnimations(),
    provideStore(),
    provideEffects()
  ]
}).catch(err => console.error(err));
