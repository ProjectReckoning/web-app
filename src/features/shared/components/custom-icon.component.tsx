import { Icon, IconifyIconProps } from '@iconify/react';

export default function CustomIcon({ name, ...props }: Omit<IconifyIconProps, 'name' | 'icon'> & { name: string }) {
  const icons: Record<string, string> = {
    wallet: 'material-symbols:wallet',
    bank: 'material-symbols:bank',
    savings: 'material-symbols:savings',
    card: 'material-symbols:credit-card',
    income: 'material-symbols:paid',
    cash: 'material-symbols:attach-money',
    investment: 'material-symbols:monetization-on',
    payment: 'material-symbols:money',
    exchange: 'material-symbols:currency-exchange',
    category: 'material-symbols:category',
  };

  const iconName = icons[name.toLowerCase()] || 'material-symbols:help-outline';

  const filteredProps = Object.fromEntries(
    Object.entries(props).filter((v) => v !== null)
  );

  return <Icon icon={iconName} {...filteredProps} />;
}
