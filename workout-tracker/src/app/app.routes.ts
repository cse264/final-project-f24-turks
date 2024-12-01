// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/expenses', pathMatch: 'full' },
    { path: 'expenses', component: ExpenseListComponent },

];