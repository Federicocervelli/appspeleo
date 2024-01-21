import { View, } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ListScreen from '../screens/ListScreen'
import HomeScreen from '../screens/HomeScreen'
import { useColorScheme } from 'nativewind'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTheme } from'react-native-paper'


import { enGB, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en', enGB)

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()



const AppNavigation = ({utenti}) => {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const theme = useTheme();
  const TabNavigator = () => {
    return (
        <Tab.Navigator        
        screenOptions={({ route }) => ({
        headerShown: false, 
        
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home'
          } else if (route.name === 'List') {
            iconName = 'list'
          }

          const cusomizeSize = 25;
          return (
            <Ionicons name={iconName} size={cusomizeSize} color={focused ? 'white' : 'gray'} />
          )
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelStyle: {
          fontSize: 0,
          
        },
        tabBarStyle: {
          backgroundColor: theme.dark ? "black" : theme.colors.surface,
          height: 60,
          borderTopColor: theme.colors.surfaceVariant,
        },
        
      })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="List" component={ListScreen} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation