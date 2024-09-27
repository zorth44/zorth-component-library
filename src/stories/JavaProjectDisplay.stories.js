import React from 'react';
import JavaProjectDisplay from '../components/JavaProjectDisplay';

export default {
  title: 'JavaProjectDisplay',
  component: JavaProjectDisplay,
};

const Template = (args) => <JavaProjectDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
  project: {
    name: "MyJavaProject",
    type: "folder",
    children: [
      {
        name: "src",
        type: "folder",
        children: [
          {
            name: "Main.java",
            type: "file",
            content: `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java Project!");
    }
}
            `
          },
          {
            name: "Utils.java",
            type: "file",
            content: `
public class Utils {
    public static int add(int a, int b) {
        return a + b;
    }
}
            `
          }
        ]
      },
      {
        name: "README.md",
        type: "file",
        content: "# My Java Project\n\nThis is a sample Java project."
      }
    ]
  }
};

export const EmptyProject = Template.bind({});
EmptyProject.args = {
  project: {
    name: "EmptyProject",
    type: "folder",
    children: []
  }
};

export const InvalidProject = Template.bind({});
InvalidProject.args = {
  project: null
};