import { Routes } from '@angular/router';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { RegisterComponent } from './Pages/Auth/Register/register.component';
import { LoginComponent } from './Pages/Auth/Login/login.component';
import { BooksListComponent } from './Pages/books/books-list/books-list.component';
import { BookViewComponent } from './Pages/books/book-view/book-view.component';
import { AuthorsListComponent } from './Pages/authors/authors-list/authors-list.component';
import { AuthorViewComponent } from './Pages/authors/author-view/author-view.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'books', component: BooksListComponent },
  { path: 'books/:id', component: BookViewComponent },
  { path: 'authors', component: AuthorsListComponent },
  { path: 'authors/:id', component: AuthorViewComponent },
  { path: '**', redirectTo: '/NotFound' },
];
