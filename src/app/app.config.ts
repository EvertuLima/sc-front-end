import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { roomReducer } from './store/roomStore/room.reducers';
import { RoomEffects } from './store/roomStore/room.effects';
import { itemReducer } from './store/itemStore/item.reducers';
import { ItemEffects } from './store/itemStore/item.effects';
import { authReducer, metaAuthReducers } from './store/authStore/auth.reducers';
import { AuthInterceptor } from './services/authService/auth.interceptor';
import { AuthEffects } from './store/authStore/auth.effects';
import { registerUserReducer } from './store/registerUserStore/registerUser.reducers';
import { RegisterUserEffects } from './store/registerUserStore/registerUser.effects';
import { userReducer, metaUserReducers } from './store/userStore/user.reducers';
import { UserEffects } from './store/userStore/user.effects';
import { metaStoreReducers } from './store/store.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideStore(
      {
        user: userReducer,
        rooms: roomReducer,
        items: itemReducer,
        auth: authReducer,
        registerUser: registerUserReducer,
      },
      { metaReducers: metaStoreReducers }
    ),
    provideState({ name: 'rooms', reducer: roomReducer }),
    provideState({ name: 'items', reducer: itemReducer }),
    provideState({ name: 'registerUser', reducer: registerUserReducer }),
    provideState('auth', authReducer, { metaReducers: metaAuthReducers }),
    provideState('user', userReducer, { metaReducers: metaUserReducers }),
    provideEffects([
      RoomEffects,
      ItemEffects,
      AuthEffects,
      RegisterUserEffects,
      UserEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};
