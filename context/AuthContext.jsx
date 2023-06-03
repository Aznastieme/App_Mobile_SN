import {useRouter, useSegments} from "expo-router";
import {createContext, useState, useContext, useEffect} from "react";
import * as SecureStore from 'expo-secure-store'

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isAuthGroup = segments[0] == "(auth)";

    if (!authToken && !isAuthGroup) {
      console.log("User not auth");
      router.replace("/signIn");
    }
    if (authToken && isAuthGroup) {
      router.replace("/");
    }
  }, [segments, authToken]);

  useEffect(() => {
    const loadAuthToken = async () => {
      const response = await SecureStore.getItemAsync('authToken');
      if(response) setAuthToken(response);
    };
    loadAuthToken();
  }, [])

  const updateAuthToken = async (newToken) => {
    await SecureStore.setItemAsync('authToken', newToken);
    setAuthToken(newToken);
  }

  return (<AuthContext.Provider value={{
      authToken,
      updateAuthToken
    }}>
    {children}
  </AuthContext.Provider>);
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
