import {useRouter, useSegments} from "expo-router";
import {createContext, useState, useContext, useEffect} from "react";
import * as SecureStore from 'expo-secure-store'
import postApply from "../hook/postApply";

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(null);
  const [authId, setAuthId] = useState(null);
  const segments = useSegments();
  const router = useRouter();
  

  useEffect(() => {
    const isAuthGroup = segments[0] == "(auth)";

    if (!authToken && !isAuthGroup) {
      console.log("User not auth");
      router.replace("/signIn");
    }
    if (authToken && isAuthGroup) {
      console.log(authToken, "Token", authId, "Id")
      router.replace("/");
    }
  }, [segments, authToken]);

  useEffect(() => {
    const loadAuth = async () => {

      const response = await SecureStore.getItemAsync('authToken');
      setAuthToken(response);
      const id = await SecureStore.getItemAsync('authId');
      setAuthId(id);
      // const data = postApply(response, id)
      // if(data && response && id){
      //    setAuthToken(response);
      //    setAuthId(id);
      // }
    };
    loadAuth();
  }, [])

  const updateAuthToken = async (newToken) => {
    await SecureStore.setItemAsync('authToken', newToken);
    setAuthToken(newToken);
  }

  const updateAuthId = async (newId) => {
    await SecureStore.setItemAsync('authId', newId)
    setAuthId(newId);
  }

  return (<AuthContext.Provider value={{
      authToken,
      updateAuthToken,
      authId,
      updateAuthId
    }}>
    {children}
  </AuthContext.Provider>);
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
