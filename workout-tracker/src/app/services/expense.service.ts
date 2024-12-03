// src/app/services/expenses.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Expense {
    name: string;
    amount: number;
    category: string;
    account: string;
}

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private expensesKey = 'expenses';
    private paidExpenses = "paidExpenses";
    private expenses = new BehaviorSubject<Expense[]>(this.getExpenses());
    private paidExpensesList = new BehaviorSubject<Expense[]>(this.getPaidExpenses());
    expenses$ = this.expenses.asObservable();
    paidExpensesList$ = this.paidExpensesList.asObservable();
    private getExpenses(): Expense[] {
        try {
            const savedExpenses = localStorage.getItem(this.expensesKey);
            return savedExpenses ? JSON.parse(savedExpenses) : [];
        } catch (error) {
            console.error('Failed to parse expenses from localStorage', error);
            return [];
        }
    }
    private getPaidExpenses(): Expense[] {
        try {
            const savedExpenses = localStorage.getItem(this.paidExpenses);
            return savedExpenses ? JSON.parse(savedExpenses) : [];
        } catch (error) {
            console.error('Failed to parse paid expenses from localStorage', error);
            return [];
        }
    }

    private saveExpenses(expenses: Expense[], paid: boolean = false) {
        try {
            if(paid) {
                console.log("saving to paid expenses");
                console.log("expenses",expenses);
                localStorage.setItem(this.paidExpenses, JSON.stringify(expenses));
            }else{
                console.log("saving to normal expenses");
                console.log("expenses",expenses);
                localStorage.setItem(this.expensesKey, JSON.stringify(expenses));
            }
        } catch (error) {
            console.error('Failed to save expenses to localStorage', error);
        }
    }

    addExpense(expense: Expense, paid: boolean = false) {
        let currentExpenses = this.expenses.value;
        if(paid){
             currentExpenses = this.paidExpensesList.value;
        }else{
            currentExpenses = this.expenses.value;
        }
        console.log("current expenses,",currentExpenses)
        currentExpenses.push(expense);
        this.saveExpenses(currentExpenses,paid);
        if(paid){
            this.paidExpensesList.next([...currentExpenses]);
        }else{
            this.expenses.next([...currentExpenses]);
        }
    }


    deleteExpense(index: number, paid: boolean = false) {
        let currentExpenses = this.expenses.value;
        if(paid){
             currentExpenses = this.paidExpensesList.value;
        }
        if (index >= 0 && index < currentExpenses.length) {
            currentExpenses.splice(index, 1);
            this.saveExpenses(currentExpenses,paid);
            this.expenses.next([...currentExpenses]);
        } else {
            console.error('Invalid index for deletion');
        }
    }
}