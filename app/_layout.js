import {Slot, Stack} from 'expo-router';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AuthContextProvider from '../context/AuthContext';

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
      <AuthContextProvider>
        <Stack
          screenOptions={{
            headerStyle: {backgroundColor: '#FAFAFC'},
            headerShadowVisible: false,
            headerTitle: '',
          }}></Stack>
      </AuthContextProvider>
    </>
  );
};

export default Layout;
