import { Routes } from '@angular/router';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { RegisterComponent } from './Pages/Auth/Register/register.component';
import { LoginComponent } from './Pages/Auth/Login/login.component';
import { AdminLoginComponent } from './Pages/Admin/admin-login/admin-login.component';
import { AddbooksComponent } from './Pages/Admin/addbooks/addbooks.component';
import { AdminLayoutComponent } from './Pages/Admin/admin-layout/admin-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'admin',component:AdminLoginComponent},
  {path:'admin/layout',component:AdminLayoutComponent},
  // {path:'admin/addbooks',component:AddbooksComponent},

  { path: '**', redirectTo: '/NotFound' },
];
