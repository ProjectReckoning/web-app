import {
  Wallet,
  AccountBalance,
  Savings,
  CreditCard,
  Paid,
  AttachMoney,
  MonetizationOn,
  Money,
  CurrencyExchange,
  Category,
  HelpOutline,
} from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

export default function CustomIcon({ name, ...props }: Omit<SvgIconProps, 'name'> & { name: string }) {
  const icons: Record<string, React.ElementType> = {
    wallet: Wallet,
    bank: AccountBalance,
    savings: Savings,
    card: CreditCard,
    income: Paid,
    cash: AttachMoney,
    investment: MonetizationOn,
    payment: Money,
    exchange: CurrencyExchange,
    category: Category,
  };

  const IconComponent = icons[name.toLowerCase()] || HelpOutline;
  return <IconComponent {...props} />;
}
