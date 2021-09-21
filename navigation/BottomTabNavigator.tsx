/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from 'react';

import {
  Animated,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/app/TabOneScreen';
import TabTwoScreen from '../screens/app/TabTwoScreen';
import { TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator();

function IconButton(props: any) {
  const defaultScaleValue = 1;
  const scaleValue = React.useRef(new Animated.Value(defaultScaleValue)).current;
  const scaleTo = (val: number) => {
    Animated.timing(scaleValue, {
      toValue: val,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleValue }],
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPressIn={() => scaleTo(0.925)}
        onPressOut={() => scaleTo(defaultScaleValue)}
        {...props}
        underlayColor='rgba(0,0,0,0)'
        activeOpacity={1}
      >
        {props.children}
      </TouchableOpacity>
    </Animated.View>
  );
}
function TabBarIcon(props: { name: any; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const getIconButtonColor = (focused: Boolean) => (focused ? Colors[colorScheme].tabIconSelected : Colors[colorScheme].tabIconDefault);
  const getIconButtonName = (name: string, focused: Boolean) => /* (focused ? name : */ `${name}-outline`;

  const tabs = [
    { name: 'home', title: 'Home', iconName: 'home', navigator: TabOneNavigator },
    { name: 'explore', title: 'Explore', iconName: 'library', navigator: TabTwoNavigator },
    { name: 'search', title: 'Search', iconName: 'search', navigator: TabTwoNavigator },
    { name: 'browse', title: 'Browse', iconName: 'newspaper', navigator: TabTwoNavigator },
    { name: 'more', title: 'More', iconName: 'ellipsis-horizontal-circle', navigator: TabTwoNavigator },
  ];

  return (
    <BottomTab.Navigator initialRouteName='TabOne' screenOptions={{ headerShown: false }}>
      {tabs.map((tab, index) => (
        <BottomTab.Screen
          key={index}
          name={tab.name}
          component={tab.navigator}
          options={{
            title: tab.title,
            tabBarButton: (props) => <IconButton {...props} />,
            tabBarIcon: ({ color, focused }) => <TabBarIcon name={getIconButtonName(tab.iconName, focused)} color={getIconButtonColor(focused)} />,
            tabBarShowLabel: false,
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen name='TabOneScreen' component={TabOneScreen} options={{ headerShown: false, headerTitle: '' }} />
      <TabOneStack.Screen name='TabTwoScreen' component={TabTwoScreen} options={{ headerTitle: 'New' }} />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen name='TabTwoScreen' component={TabTwoScreen} options={{ headerTitle: 'Other' }} />
    </TabTwoStack.Navigator>
  );
}
