import { CurrencyType } from '../../../core/enums/currency-type.enum';

export type ChallengePricing = {
  currencyType: CurrencyType;
  amount: number;
  amountInEur: number;
  date?: Date;
}[];
