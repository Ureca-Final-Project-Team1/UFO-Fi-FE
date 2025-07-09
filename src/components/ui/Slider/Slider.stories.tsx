import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DataRangeSlider } from './DataRangeSlider';
import { DataSlider } from './DataSlider';

const meta: Meta<typeof DataSlider> = {
  title: 'UI/Slider/Slider',
  component: DataSlider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// 공통 배경 wrapper
function SliderStoryWrapper({
  children,
  padding = 'p-4',
}: {
  children: React.ReactNode;
  padding?: string;
}) {
  return <div className={`bg-black ${padding}`}>{children}</div>;
}

const DefaultSliderStory = () => {
  const [value, setValue] = useState([5]);
  return (
    <SliderStoryWrapper>
      <DataSlider value={value} onValueChange={setValue} />
    </SliderStoryWrapper>
  );
};

const TicksAndLabelsSliderStory = () => {
  const [value, setValue] = useState([5]);
  return (
    <SliderStoryWrapper padding="p-10">
      <DataSlider value={value} onValueChange={setValue} showTicks showLabels />
    </SliderStoryWrapper>
  );
};

const RangeSliderStory = () => {
  const [range, setRange] = useState([0, 20]);
  return (
    <SliderStoryWrapper>
      <DataRangeSlider value={range} onValueChange={setRange} />
    </SliderStoryWrapper>
  );
};

// Storybook export
export const Default: Story = {
  render: () => <DefaultSliderStory />,
};

export const WithTicksAndLabels: Story = {
  render: () => <TicksAndLabelsSliderStory />,
};

export const Range: Story = {
  render: () => <RangeSliderStory />,
};
