import React, {useState, useEffect} from 'react';
import {Stack, useRouter, useSearchParams, Redirect} from 'expo-router';
import axios from 'axios';

import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {CustomInput, CustomButton} from '../../components';
import {useAuth} from '../../context/AuthContext';

const SignInScreen = () => {
  const [email, setEmail] = useState('micka@gmail.com');
  const [password, setPassword] = useState('');
  
  const router = useRouter();

  const url = 'https://snapi.musardo.fr/users/login';
  const dat = {
    email: `${email}`,
    password: `${password}`,
  };
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const {updateAuthToken} = useAuth();

  const onSignInPressed = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(dat)
      });
      const responseData = await response.json();

      await updateAuthToken(responseData.token)

      //router.replace('../home');
    } catch (error) {
      console.log(error);
    } finally {
    }

  };

  useEffect(() => {}, []);

  const onForgotPasswordPressed = () => {
    console.warn('Forgot Password');
  };

  const onSignUpPressed = () => {
    router.push(`/signUp`);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F9FBFC',
      }}>
      <CustomInput placeholder="Email" value={email} setValue={setEmail} />
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />

      <CustomButton
        text={'Sign in'}
        onPress={onSignInPressed}
        type="PRIMARY"
      />

      <CustomButton
        text="Forgot Password?"
        onPress={onForgotPasswordPressed}
        type="SECONDARY"
      />

      <CustomButton
        text="Don't have an account?"
        onPress={onSignUpPressed}
        type="TERTIARY"
      />
    </SafeAreaView>
  );
};

export default SignInScreen;
