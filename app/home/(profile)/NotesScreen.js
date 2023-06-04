import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../../context/AuthContext';


const NotesScreen = () => (
  <View>
    <Text>Vous n'avez pas encore de notes.</Text>
  </View>
);

export default NotesScreen;
