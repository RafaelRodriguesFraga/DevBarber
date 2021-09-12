import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Preload from '../screens/Preload';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabRoutes from './tab.routes';
import Profile from '../screens/Profile';

const {Navigator, Screen} = createStackNavigator();

const StackRoutes = () => {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Preload"
        screenOptions={{headerShown: false}}>
            
        <Screen name="Preload" component={Preload} />
        <Screen name="Login" component={Login} />
        <Screen name="Register" component={Register} />
        <Screen name="TabRoutes" component={TabRoutes} />
        <Screen name="Profile" component={Profile} />
      </Navigator>
    </NavigationContainer>
  );
};

export default StackRoutes;
