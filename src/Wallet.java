import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Scanner;

public class Wallet {
    private ArrayList<Account> accounts;

    public Wallet() {
        this.accounts = new ArrayList<>();
    }

    public void createAccount(String accountName) {
        accounts.add(new Account(accountName));
        System.out.println("Account created successfully: " + accountName);
    }

    public Account getAccount(String accountName) {
        for (Account account : accounts) {
            if (account.getName().equalsIgnoreCase(accountName)) {
                return account;
            }
        }
        return null;
    }

    public void listAccounts() {
        if (accounts.isEmpty()) {
            System.out.println("No accounts created yet.");
        } else {
            System.out.println("Accounts:");
            for (Account account : accounts) {
                System.out.printf("Name: %s | Balance: %.2f%n", account.getName(), account.getBalance());
            }
        }
    }

    public void listTransactions(Account account) {
        ArrayList<Transaction> transactions = account.getTransactions();
        if (transactions.isEmpty()) {
            System.out.println("No transactions for this account.");
        } else {
            System.out.println("Transactions for account: " + account.getName());
            for (Transaction transaction : transactions) {
                System.out.println(transaction);
            }
        }
    }

    public void generateReport(Account account, LocalDate startDate, LocalDate endDate) {
        ArrayList<Transaction> transactions = account.getTransactions();
        System.out.printf("Report for account: %s from %s to %s%n", account.getName(), startDate, endDate);
        for (Transaction transaction : transactions) {
            if (!transaction.getDate().isBefore(startDate) && !transaction.getDate().isAfter(endDate)) {
                System.out.println(transaction);
            }
        }
    }

}
