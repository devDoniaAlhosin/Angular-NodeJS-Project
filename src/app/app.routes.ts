import { Routes } from '@angular/router';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { RegisterComponent } from './Pages/Auth/Register/register.component';
import { LoginComponent } from './Pages/Auth/Login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { CategoriesComponent } from './Pages/categories/categories.component';
import { CategoryDetailsComponent } from './Pages/category-details/category-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'home', component:HomeComponent },
  {path: 'categories' , component:CategoriesComponent},
  {path: 'category-details' , component:CategoryDetailsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/NotFound' },
];
