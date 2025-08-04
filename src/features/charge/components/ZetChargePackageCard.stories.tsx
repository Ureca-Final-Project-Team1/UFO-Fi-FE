import type { Meta, StoryObj } from '@storybook/react';

import { ZetChargePackageCard } from './ZetChargePackageCard';

const meta: Meta<typeof ZetChargePackageCard> = {
  title: 'Charge/ZetChargePackageCard',
  component: ZetChargePackageCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onBuyClick: { action: 'buy clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PackageA: Story = {
  args: {
    id: 'A',
    zet: 150,
    price: 1500,
  },
};

export const PackageB: Story = {
  args: {
    id: 'B',
    zet: 350,
    price: 3500,
  },
};

export const PackageC: Story = {
  args: {
    id: 'C',
    zet: 500,
    price: 5000,
  },
};

export const PackageD: Story = {
  args: {
    id: 'D',
    zet: 1000,
    price: 10000,
  },
};

export const PackageE: Story = {
  args: {
    id: 'E',
    zet: 3000,
    price: 30000,
  },
};
