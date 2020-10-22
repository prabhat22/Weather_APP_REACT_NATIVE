import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { WeatherNavigator } from './AppRouting';



const AppNavigator = props => {


  return (
    <NavigationContainer>
    {<WeatherNavigator/>}
    </NavigationContainer>
    
  );
};

export default AppNavigator;
