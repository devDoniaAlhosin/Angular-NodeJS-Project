import { Routes } from '@angular/router';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { RegisterComponent } from './Pages/Auth/Register/register.component';
import { LoginComponent } from './Pages/Auth/Login/login.component';

import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { RoleGuard } from './Core/guards/role.guard';
import { AdminComponent } from './Pages/admin/admin.component';
import { HomeComponent } from './Pages/home/home.component';

import { CategoriesComponent } from './Pages/categories/categories.component';
import { CategoryDetailsComponent } from './Pages/category-details/category-details.component';

import { BookViewComponent } from './Pages/books/book-view/book-view.component';
import { BooksListComponent } from './Pages/books/books-list/books-list.component';
import { AuthorsListComponent } from './Pages/authors/authors-list/authors-list.component';
import { AuthorViewComponent } from './Pages/authors/author-view/author-view.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'GoodReads | Meet Your Next Favorite Book',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'GoodReads | Home ',
  },
  { path: 'login', component: LoginComponent, title: 'GoodReads | Login ' },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'GoodReads | Register  ',
  },
  { path: 'books', component: BooksListComponent },
  { path: 'books/:id', component: BookViewComponent },
  { path: 'authors', component: AuthorsListComponent },
  { path: 'authors/:id', component: AuthorViewComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category-details', component: CategoryDetailsComponent },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'GoodReads | Admin Panel  ',
    canActivate: [RoleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found  ' },
];
