import React from 'react';
import Calendar from '../components/Calendar';

export default {
  title: 'Example/Calendar',
  component: Calendar,
};

const Template = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  // 在这里添加你的组件默认参数
};