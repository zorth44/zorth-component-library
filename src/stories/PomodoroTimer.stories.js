import React from 'react';
import PomodoroTimer from '../components/PomodoroTimer';

export default {
  title: 'PomodoroTimer',
  component: PomodoroTimer,
};

const Template = (args) => <PomodoroTimer {...args} />;

export const Default = Template.bind({});
Default.args = {};