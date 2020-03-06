import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ListScreen from '../screen/movie/index';
import DetailScreen from '../screen/movie/detail';

import theme from './../services/theme';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: theme.primary,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
        }}
        headerMode="float">
        <Stack.Screen
          name="Home"
          component={ListScreen}
          options={ListScreen.navigationOptions}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;