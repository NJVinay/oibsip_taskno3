import java.util.Scanner;

public class bankAccount 
{
    private int balance;
    
    private int previousTransaction;
    private String customerName;
    private String customerId;

    public bankAccount(String cName, String cId)
    {
        customerName = cName;
        customerId = cId;
    }

    public void deposit(int amount) 
    {
        if (amount != 0) 
        {
            balance = balance + amount;
            previousTransaction = amount;
        }
    }

    public void withdraw(int amount) 
    {
        if (amount != 0)
        {
            balance = balance - amount;
            previousTransaction = -amount;
        }
    }

    public void transfer(int amount, bankAccount toAccount)
    {
        if (amount > 0 && balance >= amount)
        {
            withdraw(amount);
            toAccount.deposit(amount);
            System.out.println("Transferred " + amount + " to BHAAVIT");
        }
       
        else
        {
            System.out.println("Transfer failed due to insufficient funds.");
        }
    }
    
    public void getPreviousTransaction() 
    {
        if (previousTransaction > 0) 
        {
            System.out.println("Deposited: " + previousTransaction);
        }
        
        else if (previousTransaction < 0) 
        {
            System.out.println("Withdrawn: " + Math.abs(previousTransaction));
        }
       
        else
        {
            System.out.println("No transaction occurred");
        }
    }

    public void showMenu() 
    {
        char option = '\0';
        Scanner scanner = new Scanner(System.in);
        System.out.println("Welcome " + customerName);
        System.out.println("Your ID is " + customerId);
        System.out.println("\n");
        System.out.println("A. Check Balance");
        System.out.println("B. Deposit");
        System.out.println("C. Withdraw");
        System.out.println("D. Previous Transaction");
        System.out.println("E. Transfer");
         System.out.println("F. Exit");

        do
        {
            System.out.println("====================================");
            System.out.println("Enter an option");
            System.out.println("====================================");
            option = scanner.next().charAt(0);
            System.out.println("\n");

            switch (option) 
            {
                
                case 'A':
                    System.out.println("------------------------------------");
                    System.out.println("Balance = " + balance);
                    System.out.println("------------------------------------");
                    System.out.println("\n");
                    break;
                
                case 'B':
                    System.out.println("------------------------------------");
                    System.out.println("Enter an amount to deposit:");
                    System.out.println("------------------------------------");
                    int amount = scanner.nextInt();
                    deposit(amount);
                    System.out.println("\n");
                    break;
                
                case 'C':
                    System.out.println("------------------------------------");
                    System.out.println("Enter an amount to withdraw:");
                    System.out.println("------------------------------------");
                    int amount2 = scanner.nextInt();
                    withdraw(amount2);
                    System.out.println("\n");
                    break;
                
                case 'D':
                    System.out.println("------------------------------------");
                    getPreviousTransaction();
                    System.out.println("------------------------------------");
                    System.out.println("\n");
                    break;
                
                case 'E':
                    System.out.println("------------------------------------");
                    System.out.println("Enter the recipient's name:");
                    System.out.println("------------------------------------");
                    String recipientName = scanner.next();
                    System.out.println("------------------------------------");
                    System.out.println("Enter the recipient's ID:");
                    System.out.println("------------------------------------");
                    String recipientId = scanner.next();
                    System.out.println("------------------------------------");
                    System.out.println("Enter the amount to transfer:");
                    System.out.println("------------------------------------");
                    int transferAmount = scanner.nextInt();
                    transfer(transferAmount, new bankAccount(recipientName, recipientId));
                    System.out.println("\n");
                    System.out.println("Balance = " + balance);
                    System.out.println("\n");
                    
                    System.out.print("\n");
                    break;
                    
                case 'F':
                    System.out.println("************************************");
                    break;
                
                default:
                    System.out.println("Invalid Option! Please enter again.");
                    break;
            }
        } 
        while (option != 'F');
        System.out.println("Thank you for banking with us.");
    }

    public static void main(String[] args) 
    {
        bankAccount customer = new bankAccount("VINAY", "123456");
        customer.showMenu();
    }
}
