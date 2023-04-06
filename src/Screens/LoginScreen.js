import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
import SafeAreaScreen from '../components/SafeAreaScreen';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ClassContext} from '../Context';

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const {setUser} = useContext(ClassContext);
  //const {setUser} = useContext(ClassContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    // if (user) {
    //   AsyncStorage.removeItem('userInfo');
    // }
    if (!email || !password) {
      alert('Pls fill valid credentials');
    }

    let response = await axios.post(
      'https://firsthostedbackend-production.up.railway.app/users/signinUser',
      {email, password},
    );
    if (response) {
      //console.log(response.data, 'frgthyjui');
      setUser(response.data.token);
      // await AsyncStorage.removeItem('userInfo');
      //await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
      alert('user loggedin successfully');
      setEmail('')
      setPassword('')
      navigation.navigate('Main');
    } else {
      alert('something went wrong');
    }
  };
  return (
    <>
      <SafeAreaScreen>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.passInput}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter Password "
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={toggleShowPassword}
                style={styles.eyeButton}>
                <Text>{showPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.forgotView}>
          <Text style={styles.forgotText}>FORGOT PASSWORD?</Text>
        </View> */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signupView}>
            <Text style={styles.signupLiteView}>Are you a new user? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupDarkView}>{'Sign up'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaScreen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  passInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.85,
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 7,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderColor: '#2153a8',
    justifyContent: 'space-between',
  },
  input: {
    width: width * 0.85,
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#2153a8',
  },
  eyeButton: {
    alignItems: 'flex-end',
  },
  forgotView: {
    alignItems: 'flex-end',
  },
  forgotText: {
    color: 'blue',
    fontSize: 12,
  },
  button: {
    marginVertical: 30,
    width: width * 0.85,
    backgroundColor: 'blue',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  signupView: {
    display: 'flex',
    flexDirection: 'row',
  },
  signupLiteView: {
    color: '#bcb5b5',
  },
  signupDarkView: {
    color: 'blue',
  },
});

export default LoginScreen;
