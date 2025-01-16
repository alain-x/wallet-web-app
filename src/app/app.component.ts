import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Add CommonModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private baseUrl = 'http://localhost:8080/api';

  accounts: any[] = [];
  transactions: any[] = [];
  budgets: any[] = [];
  newAccount = { accountName: '', accountType: '', balance: 0 };
  newTransaction = {
    amount: 0,
    transactionType: '',
    description: '',
    category: '',
    subcategory: '',
    accountId: '',
  };
  newBudget = { limitAmount: 0, currentSpending: 0, category: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAccounts();
    this.fetchBudgets();
  }

  fetchAccounts() {
    this.http.get<any[]>(`${this.baseUrl}/accounts`).subscribe(
      (data) => (this.accounts = data),
      (error) => console.error('Error fetching accounts:', error)
    );
  }

  addAccount() {
    this.http.post(`${this.baseUrl}/accounts`, this.newAccount).subscribe(
      () => this.fetchAccounts(),
      (error) => console.error('Error adding account:', error)
    );
  }

  fetchTransactions(category: string) {
    this.http.get<any[]>(`${this.baseUrl}/transactions/${category}`).subscribe(
      (data) => (this.transactions = data),
      (error) => console.error('Error fetching transactions:', error)
    );
  }

  addTransaction() {
    this.http
      .post(`${this.baseUrl}/transactions`, this.newTransaction)
      .subscribe(
        () => {
          alert('Transaction added!');
          this.fetchTransactions(this.newTransaction.category); // Refresh the transactions list
        },
        (error) => console.error('Error adding transaction:', error)
      );
  }

  fetchBudgets() {
    this.http.get<any[]>(`${this.baseUrl}/budgets`).subscribe(
      (data) => (this.budgets = data),
      (error) => console.error('Error fetching budgets:', error)
    );
  }

  addBudget() {
    this.http.post(`${this.baseUrl}/budgets`, this.newBudget).subscribe(
      () => this.fetchBudgets(),
      (error) => console.error('Error adding budget:', error)
    );
  }
}
