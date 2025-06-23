import transactionHistoryRepository from "@/features/insight/repositories/transaction-history.repository";
import { TransactionType } from "@/features/insight/constants/transaction-type.enum";
import { TransactionCategory } from "../constants/transaction-category.enum";
import { GetTransactionDurationOption } from "../constants/get-transaction-history-duration-option.enum";

describe("transactionHistoryRepository", () => {
  describe("getLast5Transaction", () => {
    it("should return last 5 transactions", async () => {
      jest
        .spyOn(transactionHistoryRepository, "getLast5Transaction")
        .mockResolvedValue([
          {
            type: TransactionCategory.Expense,
            amount: 100,
            description: "Groceries",
            transactionType: TransactionType.OUTCOME,
          },
          {
            type: TransactionCategory.Income,
            amount: 500,
            description: "Salary",
            transactionType: TransactionType.INCOME,
          },
          {
            type: TransactionCategory.Expense,
            amount: 50,
            description: "Transport",
            transactionType: TransactionType.OUTCOME,
          },
          {
            type: TransactionCategory.Income,
            amount: 200,
            description: "Freelance",
            transactionType: TransactionType.INCOME,
          },
          {
            type: TransactionCategory.Expense,
            amount: 30,
            description: "Snacks",
            transactionType: TransactionType.OUTCOME,
          },
        ]);

      const result = await transactionHistoryRepository.getLast5Transaction();

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(5);

      result.forEach((transaction) => {
        expect(transaction).toEqual(
          expect.objectContaining({
            type: expect.any(String),
            amount: expect.any(Number),
            description: expect.any(String),
            transactionType: expect.any(String),
          })
        );

        expect([TransactionType.INCOME, TransactionType.OUTCOME]).toContain(
          transaction.transactionType
        );
      });
    });
  });

  describe("getAllTransaction", () => {
    it("should return transaction overview for a pocket", async () => {
      const pocketId = "1";
      const duration: GetTransactionDurationOption =
        GetTransactionDurationOption.LAST_30_DAYS; // Replace with a valid enum value

      jest
        .spyOn(transactionHistoryRepository, "getAllTransaction")
        .mockResolvedValue({
          transactions: [
            {
              type: TransactionCategory.Expense,
              amount: 100,
              purpose: "Groceries",
              transactionType: TransactionType.OUTCOME,
              createdAt: "2023-01-01T00:00:00Z",
              initiatorUser: "123",
            },
          ],
          totalIncome: 500,
          totalOutcome: 100,
          previousBalance: 1000,
          closingBalance: 1400,
        });

      const result = await transactionHistoryRepository.getAllTransaction(
        pocketId,
        duration
      );

      expect(result).toEqual(
        expect.objectContaining({
          transactions: expect.any(Array),
          totalIncome: expect.any(Number),
          totalOutcome: expect.any(Number),
          previousBalance: expect.any(Number),
          closingBalance: expect.any(Number),
        })
      );

      result.transactions.forEach((txn) => {
        expect(txn).toEqual(
          expect.objectContaining({
            type: expect.any(String),
            amount: expect.any(Number),
            purpose: expect.any(String),
            transactionType: expect.any(String),
            createdAt: expect.any(String),
            initiatorUser: expect.any(String),
          })
        );
      });
    });
  });
});
