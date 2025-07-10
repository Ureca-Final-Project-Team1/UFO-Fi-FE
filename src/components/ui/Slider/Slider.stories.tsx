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
  return <div className={`bg-black ${padding} w-[320px] max-w-full mx-auto`}>{children}</div>;
}

const DefaultSliderStory = () => {
  const [value, setValue] = useState([5]);
  return (
    <SliderStoryWrapper>
      <DataSlider
        value={value}
        onValueChange={setValue}
        minLabel="0GB"
        maxLabel="10GB"
        max={10} // maxLabel과 실제 max 값을 맞춰줌
      />
    </SliderStoryWrapper>
  );
};

const TicksAndLabelsSliderStory = () => {
  const [value, setValue] = useState([5]);
  return (
    <SliderStoryWrapper padding="p-10">
      <DataSlider
        value={value}
        onValueChange={setValue}
        showTicks
        showLabels
        minLabel="0GB"
        maxLabel="10GB"
        max={10}
      />
    </SliderStoryWrapper>
  );
};

const RangeSliderStory = () => {
  const [range, setRange] = useState([0, 20]);
  return (
    <SliderStoryWrapper>
      <DataRangeSlider
        value={range}
        onValueChange={setRange}
        min={0}
        max={20}
        minLabel="0원"
        maxLabel="10,000원"
      />
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
