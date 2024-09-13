import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, Dimensions, Image, Alert } from 'react-native';
import { signInWithEmailAndPassword, onAuthStateChanged,  initializeAuth, getReactNativePersistence } from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from '@firebase/app';
import { getFirestore, doc, getDoc } from '@firebase/firestore';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { TouchableHighlight } from 'react-native-gesture-handler';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');
const googleLogo = require('../img/google-logo.png');

const firebaseConfig = {
  apiKey: "AIzaSyC7Y3mJQ8EfFbvP9OAJ5Vb4lW5TO284_Fs",
  authDomain: "nhac-83fd2.firebaseapp.com",
  projectId: "nhac-83fd2",
  storageBucket: "nhac-83fd2.appspot.com",
  messagingSenderId: "971934815200",
  appId: "1:971934815200:web:7539262764480840bf5185",
  measurementId: "G-V5NPN7G6FP"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

const Tela_Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {

          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            navigation.navigate('Tela_Home', { userData: userDoc.data() });
          } else {
            console.error('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
          Alert.alert('Error', 'Failed to fetch user data.');
        }
      }
    });

    return () => unsubscribe();
  }, [auth, navigation]);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '887696697850-s3uevbgvsn1l095fn5dsbc6ui3jpm206.apps.googleusercontent.com'
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('Google Login successful, ID token:', id_token);

      const fetchGoogleUser = async () => {
        try {
          const credential = Google.GoogleAuthProvider.credential(id_token);
          const userCredential = await signInWithCredential(auth, credential);
          const user = userCredential.user;

          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            console.log('User data:', userDoc.data());
            navigation.navigate('HomeScreen', { userData: userDoc.data() });
          } else {
            console.error('No such document!');
          }
        } catch (error) {
          console.error('Error with Google login:', error.message);
          Alert.alert('Error', 'Failed to login with Google.');
        }
      };

      fetchGoogleUser();
    }
  }, [response]);

  const logarUsuario = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Login Error', 'Por favor coloque email e senha');
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        navigation.navigate('Tela_Home', { userData: userDoc.data() });
      } else {
        console.error('Nenhum documento !!');
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fundo_login.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.centeredButton}>
          <TouchableHighlight
            style={{ marginTop: -30 }}
            onPress={() => promptAsync()}
            underlayColor="#ddd"
            disabled={!request}
          >
            <Image source={googleLogo} style={styles.image} />
          </TouchableHighlight>
        </View>

        <View style={styles.centeredButton}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor="#ffffff"
            textAlign="center"
          />
        </View>
        <View style={styles.centeredButton}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Senha"
            secureTextEntry
            placeholderTextColor="#ffffff"
            textAlign="center"
          />
        </View>
        <View style={styles.centeredButton}>
          <TouchableHighlight title="Login" onPress={logarUsuario} style={styles.input2} underlayColor="#F39C12">
            <Text style={{ color: 'white', fontSize: 18 }}>Entrar</Text>
          </TouchableHighlight>
        </View>

        <Text style={styles.toggleText} onPress={() => navigation.navigate('Inicio')}>
          Voltar
        </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    marginLeft: -20,
    flex: 1,
    marginTop: -20,
    width: width + 10,
    height: height + 50,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FCFFEE',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 12,
    borderRadius: 20,
    width: 330,
    fontSize: 18,
  },
  input2: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 12,
    borderRadius: 20,
    width: 140,
    fontSize: 18,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
    marginTop: 18,
    fontSize: 18,
    marginLeft: -260,
  },
  centeredButton: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 30,
  },
});

export default Tela_Login;

