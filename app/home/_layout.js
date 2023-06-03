import {Stack, Tabs} from 'expo-router';
import {FontAwesome} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';

import {COLORS, icons, images, SIZES} from '../../constants';

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: {backgroundColor: '#FAFAFC'},
        headerShadowVisible: false,
        headerTitle: '',
      }}>
      <Tabs.Screen
        name="homeScreen"
        options={{
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => (
            <AntDesign name="profile" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};
