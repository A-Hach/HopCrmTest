import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Provider } from 'react-native-paper';
import { Appbar, Menu } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import HomeScreen from './screens/HomeScreen';
import ContactsScreen from './screens/ContactsScreen';
import ContactDetailsScreen from './screens/ContactDetailsScreen';
import CustomNavigationBar from './screens/components/Navbar';




const Stack = createStackNavigator();



export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Contacts" component={ContactsScreen} />
          <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});