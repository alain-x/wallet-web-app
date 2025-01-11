import java.util.ArrayList;

public class Account {
    private String name;
    private double balance;
    private double budgetLimit;
    private ArrayList<Transaction> transactions;

    public Account(String name) {
        this.name = name;
        this.balance = 0;
        this.budgetLimit = 0;
        this.transactions = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public double getBalance() {
        return balance;
    }

    public void setBudgetLimit(double budgetLimit) {
        this.budgetLimit = budgetLimit;
    }

    public boolean addTransaction(Transaction transaction) {
        if (transaction.getType().equalsIgnoreCase("expense") && transaction.getAmount() > balance) {
            System.out.println("Insufficient balance for this expense!");
            return false;
        }

        if (transaction.getType().equalsIgnoreCase("expense") && (balance - transaction.getAmount()) < budgetLimit) {
            System.out.println("You are exceeding your budget limit!");
        }

        transactions.add(transaction);
        if (transaction.getType().equalsIgnoreCase("income")) {
            balance += transaction.getAmount();
        } else if (transaction.getType().equalsIgnoreCase("expense")) {
            balance -= transaction.getAmount();
        }
        return true;
    }

    public ArrayList<Transaction> getTransactions() {
        return transactions;
    }
}
