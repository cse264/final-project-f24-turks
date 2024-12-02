// src/app/expense-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component"
import { environment } from '../environment';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-expense-list',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent,RouterModule],
    templateUrl: './expense-list.component.html',
    styleUrl: './expense-list.component.less'
})
export class ExpenseListComponent {
    expenses: any[] = [];
    isFormVisible = false;
    newExpense = { name: '', amount: 0, category: '', account: '' , youtubeURL: ''};
    categories = ['Strength Training','Cardiovascular (Cardio) Training','Flexibility and Mobility Training','Balance and Stability Training','Power Training','Endurance Training','Functional Training','Mind-Body Workouts'];
    // Example categories
    constructor(private expenseService: ExpenseService,private router: Router) {}
    ngOnInit() {
        // Subscribe to the expenses observable
        this.expenseService.expenses$.subscribe(expenses => {
            this.expenses = expenses;
        });
    }

    openExpenseForm() {
        this.isFormVisible = true;
    }

    closeExpenseForm() {
        this.isFormVisible = false;
        this.newExpense = { name: '', amount: 0, category: '', account: '', youtubeURL: '' };
    }
    setYoutubeURL(): Promise<void> {
        const query = this.newExpense.account;
        return fetch(`https://www.googleapis.com/youtube/v3/search?key=${environment.youtubeApiKey}&q=${query}&type=video&part=snippet`)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    this.newExpense.youtubeURL = `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
                }
                console.log('YouTube video URL:', this.newExpense.youtubeURL);
            })
            .catch(error => {
                console.error('Error fetching YouTube video:', error);
            });
    }
    logout(){
        this.router.navigate(['/login']);
    }
    async addExpense() {
        //await this.setYoutubeURL(); //uncomment to enable youtube search
        if (this.newExpense.name && this.newExpense.amount && this.newExpense.category
        && this.newExpense.account) {
            console.log('Adding expense:', this.newExpense);
            this.expenseService.addExpense(this.newExpense);
            this.closeExpenseForm();
        }
    }

    deleteExpense(expense: any) {
        const index = this.expenses.findIndex(e => e === expense);
        // Find index based on the expense object
        if (index >= 0) {
            this.expenseService.deleteExpense(index);
        } else {
            console.error('Workout not found for deletion');
        }
    }

}