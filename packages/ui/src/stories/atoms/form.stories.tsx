import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../../atoms/form.tsx';

const meta: Meta<typeof Form> = {
  component: Form,
  title: 'Stories/form/form',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Primary: Story = {
  args: {
    children: <></>,
  },
};
