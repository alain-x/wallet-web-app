import java.time.LocalDate;
import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        Wallet app = new Wallet();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n Menu:");
            System.out.println("1) Create Account\n");
            System.out.println("2) Add Transaction\n");
            System.out.println("3) Display All Transactions\n");
            System.out.println("4) Generate Report\n");
            System.out.println("5) Set Budget Limit\n");
            System.out.println("6) Display All Accounts\n");
            System.out.println("7) Exit\n");
            System.out.print("Choose an option: ");

            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    System.out.print("Enter account name: ");
                    String accountName = scanner.nextLine();
                    app.createAccount(accountName);
                    break;

                case 2:
                    System.out.print("Enter account name: ");
                    accountName = scanner.nextLine();
                    Account account = app.getAccount(accountName);
                    if (account == null) {
                        System.out.println("Account not found.");
                        break;
                    }
                    System.out.print("Enter type (income/expense): ");
                    String type = scanner.nextLine();
                    System.out.print("Enter category Salary,Business Profits: ");
                    String category = scanner.nextLine();
                    System.out.print("Enter amount: ");
                    double amount = scanner.nextDouble();
                    scanner.nextLine(); 
                    System.out.print("Enter description: ");
                    String description = scanner.nextLine();
                    System.out.print("Enter date (YYYY-MM-DD): ");
                    LocalDate date = LocalDate.parse(scanner.nextLine());

                    account.addTransaction(new Transaction(account.getName(), type, category, amount, description, date));
                    break;

                case 3:
                    System.out.print("Enter account name: ");
                    accountName = scanner.nextLine();
                    account = app.getAccount(accountName);
                    if (account != null) {
                        app.listTransactions(account);
                    } else {
                        System.out.println("Account not found.");
                    }
                    break;

                case 4:
                    System.out.print("Enter account name: ");
                    accountName = scanner.nextLine();
                    account = app.getAccount(accountName);
                    if (account == null) {
                        System.out.println("Account not found.");
                        break;
                    }
                    System.out.print("Enter start date (YYYY-MM-DD): ");
                    LocalDate startDate = LocalDate.parse(scanner.nextLine());
                    System.out.print("Enter end date (YYYY-MM-DD): ");
                    LocalDate endDate = LocalDate.parse(scanner.nextLine());

                    app.generateReport(account, startDate, endDate);
                    break;

                case 5:
                    System.out.print("Enter account name: ");
                    accountName = scanner.nextLine();
                    account = app.getAccount(accountName);
                    if (account != null) {
                        System.out.print("Enter budget limit: ");
                        double limit = scanner.nextDouble();
                        account.setBudgetLimit(limit);
                        System.out.println("Budget limit set successfully.");
                    } else {
                        System.out.println("Account not found.");
                    }
                    break;

                case 6:
                    app.listAccounts();
                    break;

                case 7:
                    System.out.println("Exiting Wallet.");
                    scanner.close();
                    return;

                default:
                    System.out.println("Invalid Please try again.");
            }
        }
    }

}
