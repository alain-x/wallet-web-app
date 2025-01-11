import java.time.LocalDate;

public class Transaction {
    private String account;
    private String type;
    private String category;
    private double amount;
    private String description;
    private LocalDate date;

    public Transaction(String account, String type, String category, double amount, String description, LocalDate date) {
        this.account = account;
        this.type = type;
        this.category = category;
        this.amount = amount;
        this.description = description;
        this.date = date;
    }

    public String getAccount() {
        return account;
    }

    public String getType() {
        return type;
    }

    public String getCategory() {
        return category;
    }

    public double getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getDate() {
        return date;
    }

    @Override
    public String toString() {
        return String.format("Date: %s | Account: %s | Type: %s | Category: %s | Amount: %.2f | Description: %s",
                date, account, type, category, amount, description);
    }
}
