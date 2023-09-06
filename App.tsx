import React from 'react';
import {NativeBaseProvider, Box, View, theme} from 'native-base';
import Home from './src/screen/Home';
import BottomTab from './src/component/BottomTab';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddExpense from './src/screen/Expenses/AddExpense';
import AddFriend from './src/screen/Friends/AddFriends';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {/* <View flex={1} backgroundColor={theme.colors.gray[200]}>
          <Home />
        </View>
        <BottomTab /> */}

        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Expense Tracker',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: theme.colors.primary[600],
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'normal',
              },
            }}
          />
          <Stack.Screen
            name="AddExpense"
            component={AddExpense}
            options={{
              title: 'Add Details',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: theme.colors.primary[600],
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'normal',
              },
            }}
          />
          <Stack.Screen
            name="AddFriend"
            component={AddFriend}
            options={{
              title: 'Add Friend Details',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: theme.colors.primary[600],
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'normal',
              },
            }}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
