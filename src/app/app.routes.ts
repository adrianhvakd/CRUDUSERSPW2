import { Routes } from '@angular/router';
import { CrudComponent } from './core/crud/crud.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    component:CrudComponent,
    path:'crud',
    canActivate: [authGuard]
  },
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: RegisterComponent,
    path: 'register'
  }
];
