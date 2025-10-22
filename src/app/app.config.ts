import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
const firebaseConfig = {
  apiKey: "AIzaSyDffaV_rtnAw438xfz91m3HaCA8zObaICo",
  authDomain: "borrar1-2a0bf.firebaseapp.com",
  databaseURL: "https://borrar1-2a0bf-default-rtdb.firebaseio.com",
  projectId: "borrar1-2a0bf",
  storageBucket: "borrar1-2a0bf.firebasestorage.app",
  messagingSenderId: "596359231117",
  appId: "1:596359231117:web:2fbca2596571fe08f594c4",
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideAnimationsAsync(),
    providePrimeNG({
            theme: {
                preset: Aura
            }
        })
  ]
};
