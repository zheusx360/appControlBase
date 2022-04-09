import React from 'react';
import {StatusBar} from 'react-native';
import {InitialContextProvider} from './src/contexts/initialContext';
import {NavigationContainer} from '@react-navigation/native';
import {Routes} from './src/routes/auth.routes';

const App = () => {
  StatusBar.setHidden(true);
  return (
    <NavigationContainer>
      <InitialContextProvider>
        <Routes />
      </InitialContextProvider>
    </NavigationContainer>
  );
};

export default App;
