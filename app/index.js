import React from 'react-native';
import {Text, View} from 'react-native';
import {Link, Redirect} from 'expo-router';

export default function Page() {
  return (
    <Redirect href={'/home/homeScreen'}/>
  );
}
