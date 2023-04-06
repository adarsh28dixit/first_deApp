import {createContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ClassContext = createContext();

export const ContextProvider = props => {
  const [user, setUser] = useState();
  //const navigation = useNavigation();
  // useEffect(() => {
  //   const getUserDataFromLocalStorage = async () => {
  //     try {
  //       const userData = await AsyncStorage.getItem('userInfo');
  //       if (userData !== null) {
  //         setUser(JSON.parse(userData));
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getUserDataFromLocalStorage();
  // }, []);
  return (
    <ClassContext.Provider value={{user, setUser}}>
      {props.children}
    </ClassContext.Provider>
  );
};
