import {Slot, Stack} from 'expo-router';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AuthContextProvider from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <>
    <StatusBar hidden />
      <AuthContextProvider>
        
        <Stack
          screenOptions={{
            headerStyle: {backgroundColor: '#FAFAFC'},
            headerShadowVisible: false,
            headerTitle: '',
          }}>
            <Stack.Screen name="home" options={{headerShown: false}}/>
            <Stack.Screen name="create-event/[id]" options={{heaerShadowVisible: true, headerTitle: '         Create an event'}}/>
          </Stack>
      </AuthContextProvider>
    </>
  );
};

export default Layout;
