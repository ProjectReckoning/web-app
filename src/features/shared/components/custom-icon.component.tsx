import { Icon, IconProps } from "@iconify/react";

export default function CustomIcon({
  name,
  ...props
}: Omit<IconProps, "icon"> & { name: string }) {
  const icons: Record<string, string> = {
    wallet: "material-symbols:wallet",
    bank: "material-symbols:bank",
    savings: "material-symbols:savings",
    card: "material-symbols:credit-card",
    cash: "material-symbols:attach-money",
    investment: "material-symbols:monetization-on",
    exchange: "material-symbols:currency-exchange",
    category: "material-symbols:category",
    diamond: "material-symbols:diamond",
    airplane: "material-symbols:airplane-ticket",
    moonstar: "material-symbols:star",

    // Icons for specific pockets
    pocket: "material-symbols:money-bag-outline",
    food: "fluent:food-32-regular",
    hanger: "tabler:hanger",
    scissors: "mingcute:scissors-line",
    plant: "akar-icons:plant",
    motorcycle: 'pepicons-pop:motorcycle',
    group: "material-symbols:group",

    // Transaction enums
    withdrawal: 'lucide:banknote-arrow-down',
    transfer: 'lucide:send',
    other: 'lucide:wallet-cards',

    sell: 'lucide:hand-coins',
    autorecurring: 'material-symbols:schedule',

    contribution: 'material-symbols:volunteer-activism',
    payment: 'material-symbols:credit-card',
    autotopup: 'material-symbols:autorenew',
    topup: 'lucide:banknote-arrow-up',
    income: 'material-symbols:attach-money',
    expense: 'material-symbols:money-off',
  };

  if (!icons[name.toLowerCase()]) {
    console.error("Cannot find icon with name: ", name)
  }
  const iconName = icons[name.toLowerCase()] || "material-symbols:help-outline";

  const filteredProps = Object.fromEntries(
    Object.entries(props).filter((v) => v !== null)
  );

  return <Icon icon={iconName} {...filteredProps} />;
}
