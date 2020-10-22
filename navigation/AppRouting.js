import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {Constants as Colors} from '../Constants/constants';
import MainScreen from '../screen/user/MainScreen';


const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
     headerShown:false
    
  };



const WeatherStackNavigator=createStackNavigator();
export const WeatherNavigator=()=>
{
    return(
        <WeatherStackNavigator.Navigator >
            <WeatherStackNavigator.Screen name='MainScreen' component={MainScreen} />
        </WeatherStackNavigator.Navigator>
    )
}
