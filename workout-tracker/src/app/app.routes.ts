// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { LoginComponent } from './login/login.component';
import { PaidUserComponent } from './paid-user/paid-user.component';
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'normalUser', component: ExpenseListComponent },
    { path: 'paid', component: PaidUserComponent },
];