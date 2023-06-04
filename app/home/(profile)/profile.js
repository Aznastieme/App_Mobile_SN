import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import InfoScreen from './InfoScreen';
import NotesScreen from './NotesScreen';
import SettingsScreen from './SettingsScreen';

import { useAuth } from '../../../context/AuthContext';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => {

  return(
  <Tab.Navigator>
    <Tab.Screen name="Profile" component={InfoScreen} />
    <Tab.Screen name="My notes" component={NotesScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
  )
}

export default ProfileScreen;
