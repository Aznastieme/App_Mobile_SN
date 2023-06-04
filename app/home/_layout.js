import {Stack, Tabs} from 'expo-router';
import {FontAwesome} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import { Text } from 'react-native';

import {COLORS, icons, images, SIZES} from '../../constants';

export default () => {
  return (
    <>
    
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        padding: 100,
        headerShown: false
      }}>
      <Tabs.Screen
        name="homeScreen"
        options={{
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }}
      />

      <Tabs.Screen
        name="yourEvents"
        options={{
          tabBarIcon: () => (
            <AntDesign name="profile" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="(profile)/profile"
        options={{
          tabBarIcon: () => <Ionicons name="person" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="(profile)/InfoScreen"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(profile)/NotesScreen"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(profile)/SettingsScreen"
        options={{
          href: null,
        }}
      />
    </Tabs>

    
       
    
    </>
  );
};
