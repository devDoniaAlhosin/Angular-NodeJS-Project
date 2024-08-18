import { Routes } from '@angular/router';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { RegisterComponent } from './Pages/Auth/Register/register.component';
import { LoginComponent } from './Pages/Auth/Login/login.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { RoleGuard } from './Core/guards/role.guard';
import { AdminComponent } from './Pages/admin/admin.component';
import { HomeComponent } from './Pages/home/home/home.component';
// import { HomeComponent } from './Pages/HomePage/home/home.component';

import { BooksListComponent } from './Pages/Books/books-list/books-list.component';
import { BookViewComponent } from './Pages/Books/book-view/book-view.component';
import { AuthorsListComponent } from './Pages/Authors/authors-list/authors-list.component';
import { AuthorViewComponent } from './Pages/Authors/author-view/author-view.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'GoodReads | Meet Your Next Favorite Book',
    canActivate: [RoleGuard],
    data: { expectedRole: 'guest' },
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
  {
    path: 'admin',
    component: AdminComponent,
    title: 'GoodReads | Admin Panel  ',
    canActivate: [RoleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found  ' },
];
