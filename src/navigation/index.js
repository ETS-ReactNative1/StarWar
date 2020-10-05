import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ListScreen from '@screens/list';
import DetailScreen from '@screens/detail';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}
        headerMode="float">
        <Stack.Screen
          name="Home"
          component={ListScreen}
          options={ListScreen.navigationOptions}
          header={null}
        />
        <Stack.Screen name="Detail" component={DetailScreen} header={null} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
