import { Routes } from '@angular/router';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { RegisterComponent } from './Pages/Auth/Register/register.component';
import { LoginComponent } from './Pages/Auth/Login/login.component';
import { AdminLayoutComponent } from './Pages/Admin/admin-layout/admin-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'admin',component:AdminLayoutComponent},
  { path: '**', redirectTo: '/NotFound' },
];
