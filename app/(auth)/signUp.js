import React, { useState, useContext } from 'react';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import axios from "axios";


import { SafeAreaView, Text, ScrollView } from 'react-native';
import { CustomInput, CustomButton } from '../../components';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = 'https://snapi.musardo.fr/users/signup';
  const dat = {
    username: `${username}`,
      password: `${password}`,
      bio: "",
      email: `${email}`,
      picture: "http://www.image.com",
  };
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const onRegisterPressed = async () => {
    setIsLoading(true);
    try {
      const response =await axios.post(url, dat, { headers });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
    router.push(`/signIn`)

    return (data, isLoading, error)

    useEffect(() => {
    
    }, []);
  }

  

  const onSignInPressed = () => {
    router.push(`/signIn`)
  }

  return (

    <ScrollView showVerticalScrollIndicator={false} backgroundColor="#F9FBFC">
      <SafeAreaView style={{
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#F9FBFC"
      }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: "#F9FBFC" },
            headerShadowVisible: false,
            headerTitle: ""
          }}
        />
        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          secureTextEntry={true}
        />

        <CustomButton text="Register" onPress={onRegisterPressed} type="PRIMARY" />

        <Text>By registering, you confirm that you accept our Terms of Use and Privacy Policy</Text>

        <CustomButton text="Have an account ? Sign in" onPress={onSignInPressed} type="TERTIARY" />
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpScreen;
