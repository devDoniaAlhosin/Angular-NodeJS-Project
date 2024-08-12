import { Routes } from '@angular/router';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { RegisterComponent } from './Pages/Auth/Register/register.component';
import { LoginComponent } from './Pages/Auth/Login/login.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { AdminComponent } from './Pages/admin/admin/admin.component';
import { RoleGuard } from './Core/guards/role.guard';
// import { HomeComponent } from './Pages/HomePage/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'GoodReads | Landing Page',
  },
  // {
  //   path: '/home',
  //   component: HomeComponent,
  //   title: 'GoodReads | Home ',
  // },
  { path: 'login', component: LoginComponent, title: 'GoodReads | Login ' },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'GoodReads | Register  ',
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'GoodReads | Admin Panel  ',
    canActivate: [RoleGuard],
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found  ' },
];
