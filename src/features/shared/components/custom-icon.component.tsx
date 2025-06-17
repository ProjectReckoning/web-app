import { Icon, IconProps } from '@iconify/react';

export default function CustomIcon({ name, ...props }: Omit<IconProps, 'icon'> & { name: string }) {
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
    
    // Icons for specific pockets
    pocket: 'material-symbols:money-bag-outline',
    laptop: 'material-symbols:laptop',
    diamond: 'material-symbols:diamond',
    airplane: 'material-symbols:airplane-ticket',
    moonstar: 'material-symbols:star',
    group: 'material-symbols:group',
  };

  const iconName = icons[name.toLowerCase()] || 'material-symbols:help-outline';

  const filteredProps = Object.fromEntries(
    Object.entries(props).filter((v) => v !== null)
  );

  return <Icon icon={iconName} {...filteredProps} />;
}
