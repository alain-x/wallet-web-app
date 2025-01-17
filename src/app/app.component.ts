import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private baseUrl = 'https://wallet-app-hy4l.onrender.com/api';

  accounts: any[] = [];
  transactions: any[] = [];
  budgets: any[] = [];
  newAccount = {
    accountName: '',
    accountType: '',
    balance: 0,
    currency: 'RWF',
  };
  newTransaction = {
    amount: 0,
    transactionType: '',
    description: '',
    category: '',
    subcategory: '',
    accountId: '',
    currency: 'RWF',
  };
  newBudget = {
    limitAmount: 0,
    currentSpending: 0,
    category: '',
    currency: 'RWF',
  };

  selectedAccount: any = {};
  selectedTransaction: any = {};
  selectedBudget: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAccounts();
    this.fetchBudgets();
  }

  fetchAccounts() {
    this.http.get<any[]>(`${this.baseUrl}/accounts`).subscribe(
      (data) => (this.accounts = data),
      (error) => {
        console.error('Error fetching accounts:', error);
        this.showErrorMessage(
          'Failed to fetch accounts. Please try again later.'
        );
      }
    );
  }

  addAccount() {
    this.http.post(`${this.baseUrl}/accounts`, this.newAccount).subscribe(
      () => {
        this.showSuccessMessage('Account added successfully!');
        this.fetchAccounts();
      },
      (error) => {
        console.error('Error adding account:', error);
        this.showErrorMessage('Failed to add account. Please try again.');
      }
    );
  }

  updateAccount(account: any) {
    this.http.put(`${this.baseUrl}/accounts`, account).subscribe(
      () => {
        this.showSuccessMessage('Account updated successfully!');
        this.fetchAccounts();
      },
      (error) => {
        console.error('Error updating account:', error);
        this.showErrorMessage('Failed to update account. Please try again.');
      }
    );
  }

  fetchTransactions(category: string) {
    this.http.get<any[]>(`${this.baseUrl}/transactions/${category}`).subscribe(
      (data) => (this.transactions = data),
      (error) => {
        console.error('Error fetching transactions:', error);
        this.showErrorMessage(
          'Failed to fetch transactions. Please try again later.'
        );
      }
    );
  }

  addTransaction() {
    this.http
      .post(`${this.baseUrl}/transactions`, this.newTransaction)
      .subscribe(
        () => {
          this.showSuccessMessage('Transaction added successfully!');
          this.fetchTransactions(this.newTransaction.category);
        },
        (error) => {
          console.error('Error adding transaction:', error);
          this.showErrorMessage('Failed to add transaction. Please try again.');
        }
      );
  }

  updateTransaction(transaction: any) {
    this.http.put(`${this.baseUrl}/transactions`, transaction).subscribe(
      () => {
        this.showSuccessMessage('Transaction updated successfully!');
        this.fetchTransactions(transaction.category);
      },
      (error) => {
        console.error('Error updating transaction:', error);
        this.showErrorMessage(
          'Failed to update transaction. Please try again.'
        );
      }
    );
  }

  fetchBudgets() {
    this.http.get<any[]>(`${this.baseUrl}/budgets`).subscribe(
      (data) => (this.budgets = data),
      (error) => {
        console.error('Error fetching budgets:', error);
        this.showErrorMessage(
          'Failed to fetch budgets. Please try again later.'
        );
      }
    );
  }

  addBudget() {
    this.http.post(`${this.baseUrl}/budgets`, this.newBudget).subscribe(
      () => {
        this.showSuccessMessage('Budget added successfully!');
        this.fetchBudgets();
      },
      (error) => {
        console.error('Error adding budget:', error);
        this.showErrorMessage('Failed to add budget. Please try again.');
      }
    );
  }

  updateBudget(budget: any) {
    this.http.put(`${this.baseUrl}/budgets`, budget).subscribe(
      () => {
        this.showSuccessMessage('Budget updated successfully!');
        this.fetchBudgets();
      },
      (error) => {
        console.error('Error updating budget:', error);
        this.showErrorMessage('Failed to update budget. Please try again.');
      }
    );
  }

  deleteAccount(id: number) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.http.delete(`${this.baseUrl}/accounts/${id}`).subscribe(
        () => {
          this.showSuccessMessage('Account deleted successfully!');
          this.fetchAccounts();
        },
        (error) => {
          console.error('Error deleting account:', error);
          this.showErrorMessage('Failed to delete account. Please try again.');
        }
      );
    }
  }

  deleteTransaction(id: number) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.http.delete(`${this.baseUrl}/transactions/${id}`).subscribe(
        () => {
          this.showSuccessMessage('Transaction deleted successfully!');
          this.fetchTransactions(this.selectedTransaction.category);
        },
        (error) => {
          console.error('Error deleting transaction:', error);
          this.showErrorMessage(
            'Failed to delete transaction. Please try again.'
          );
        }
      );
    }
  }

  deleteBudget(id: number) {
    console.log('Deleting budget with ID:', id);
    if (confirm('Are you sure you want to delete this budget?')) {
      this.http.delete(`${this.baseUrl}/budgets/${id}`).subscribe(
        () => {
          this.showSuccessMessage('Budget deleted successfully!');
          this.fetchBudgets();
        },
        (error) => {
          console.error('Error deleting budget:', error);
          this.showErrorMessage('Failed to delete budget. Please try again.');
        }
      );
    }
  }

  editAccount(account: any) {
    this.newAccount = { ...account };
  }

  editBudget(budget: any) {
    this.newBudget = { ...budget };
  }

  editTransaction(transaction: any) {
    this.newTransaction = { ...transaction };
  }

  // Success and Error Message Handlers
  showSuccessMessage(message: string) {
    alert(message); // You can replace alert with a UI notification component
  }

  showErrorMessage(message: string) {
    alert(message); // Replace this with a UI error notification if needed
  }
}
