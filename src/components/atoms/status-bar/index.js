import React, {Component} from 'react';
import {StatusBar} from 'react-native';

export const CustomStatusBar = ({color}) => {
  return <StatusBar backgroundColor={color} animated={true} />;
};
