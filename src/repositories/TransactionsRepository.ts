import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const incomeArr = this.transactions.filter(item => item.type === 'income');
    const outcomeArr = this.transactions.filter(
      item => item.type === 'outcome',
    );
    const val = 0;
    const income = incomeArr.reduce((acc, cur) => acc + cur.value, val);
    const outcome = outcomeArr.reduce((acc, cur) => acc + cur.value, val);

    const balance = new Balance({ income, outcome });

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    // TODO
    const tipo = type;
    const valor = value;

    if (tipo === 'outcome') {
      if (this.transactions.length === 0) {
        throw Error('You do not have balance for this operation');
      }

      const balance = this.getBalance();

      if (valor > balance.total) {
        throw Error('You are exceeding your balance.');
      }
    }
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
