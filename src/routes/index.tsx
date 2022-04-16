import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from 'styled-components';
import {InitialContext} from '../contexts/initialContext';
import * as theme from '../global/styles';
import * as Pages from '../pages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Auth = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => {
  const initial = React.useContext(InitialContext);
  useEffect(() => {
    getTheme();
  });
  const getTheme = async () => {
    const value = await AsyncStorage.getItem('@savedTheme');
    if (value) {
      initial.setTheme(value);
    } else {
      initial.setTheme('light');
    }
  };
  return (
    <ThemeProvider theme={theme[initial.darkTheme || 'light']}>
      <Auth.Navigator
        initialRouteName="Initial"
        screenOptions={{headerShown: false, statusBarHidden: true}}>
        <Auth.Screen name="Approved" component={Pages.Approved} />
        <Auth.Screen name="Initial" component={Pages.Initial} />
        <Auth.Screen name="Home" component={Pages.Home} />
        <Auth.Screen name="Register" component={Pages.Register} />
        <Auth.Screen name="SignIn" component={Pages.SignIn} />
        <Auth.Screen name="SignUp" component={Pages.SignUp} />
        <Auth.Screen name="Loan" component={Pages.Loan} />
        <Auth.Screen name="Devolutions" component={Pages.Devolutions} />
        <Auth.Screen name="UserSystem" component={Pages.UserSystem} />
        <Auth.Screen name="Query" component={Pages.Query} />
      </Auth.Navigator>
    </ThemeProvider>
  );
};
