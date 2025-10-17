import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
const firebaseConfig = {
  apiKey: "AIzaSyB8REzH-ymd1PCqZIiYo_SOSRXdok6knHI",
  authDomain: "borrar1-c26c9.firebaseapp.com",
  databaseURL: "https://borrar1-c26c9-default-rtdb.firebaseio.com",
  projectId: "borrar1-c26c9",
  storageBucket: "borrar1-c26c9.firebasestorage.app",
  messagingSenderId: "1037533696825",
  appId: "1:1037533696825:web:80d187b5510557c6c0cee8"
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideDatabase(() => getDatabase())
  ]
};
