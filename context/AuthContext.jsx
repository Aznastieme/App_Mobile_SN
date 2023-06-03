import { useRouter, useSegments } from "expo-router";
import {createContext, useState, useContext, useEffect} from "react";

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isAuthGroup = segments[0] == '(auth)'

    if(!authToken && !isAuthGroup) {
      console.log('User not auth')
      router.replace('/signIn')
    }
    if (authToken && isAuthGroup) {
      router.replace('/')
    }
    
  }, [segments, authToken])
  return (
  <AuthContext.Provider value={{
      authToken,
      setAuthToken
    }}>
    {children}
  </AuthContext.Provider>);
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
