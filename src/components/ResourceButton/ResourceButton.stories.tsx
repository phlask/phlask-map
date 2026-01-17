import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import ResourceButton from './ResourceButton';
import WaterIcon from 'icons/WaterIconChooseResource';
import FoodIcon from 'icons/FoodIconChooseResource';
import ForagingIcon from 'icons/ForagingIconChooseResource';
import BathroomIcon from 'icons/ToiletIconChooseResource';

const meta = {
  component: ResourceButton,
  args: {
    onClick: action('on-click')
  }
} satisfies Meta<typeof ResourceButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Water: Story = {
  args: {
    color: '#5286E9',
    text: 'Water',
    icon: WaterIcon
  }
};

export const Food: Story = {
  args: {
    color: '#FF9A55',
    text: 'Food',
    icon: FoodIcon
  }
};

export const Foraging: Story = {
  args: {
    color: '#5DA694',
    text: 'Foraging',
    icon: ForagingIcon
  }
};

export const Bathroom: Story = {
  args: {
    color: '#9E9E9E',
    text: 'Bathroom',
    icon: BathroomIcon
  }
};
