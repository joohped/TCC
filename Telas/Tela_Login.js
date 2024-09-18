import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, Dimensions, Image, Alert } from 'react-native';
import { signInWithEmailAndPassword, onAuthStateChanged,  initializeAuth, getReactNativePersistence } from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from '@firebase/app';
import { getFirestore, doc, getDoc } from '@firebase/firestore';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';


const { width, height } = Dimensions.get('window');

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
  const [senha, setSenha] = useState('');
  const [user, setUser] = useState(null);

  const logarUsuario = async () => {
    try {
      if (!email || !senha) {
        Alert.alert('Login Error', 'Por favor coloque email e senha, certos');
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
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

  const [fontsLoaded] = useFonts({
    'QuickDelight': require('../fonts/QuickDelight.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fundo_login.jpg')}
        style={styles.imagemFundo}
      >
        <View style={styles.botaoCentralizado}>
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
        <View style={styles.botaoCentralizado}>
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            placeholder="Senha"
            secureTextEntry
            placeholderTextColor="#ffffff"
            textAlign="center"
          />
        </View>
        <View style={styles.botaoCentralizado}>
          <TouchableHighlight title="Login" onPress={logarUsuario} style={styles.input2} underlayColor="#F39C12">
            <Text style={{ color: 'white', fontSize: 21, fontFamily: 'QuickDelight' }}>Entrar</Text>
          </TouchableHighlight>
        </View>

        <Text style={styles.textoVoltar} onPress={() => navigation.navigate('Inicio')}>
          Voltar
        </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imagemFundo: {
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
    fontFamily: 'QuickDelight',
    fontSize: 21,
  },
  input2: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 12,
    borderRadius: 20,
    width: 140,
    fontSize: 18,
  },
  textoVoltar: {
    color: '#3498db',
    textAlign: 'center',
    fontFamily: 'QuickDelight',
    marginTop: 18,
    width: 100,
    fontSize: 24,
    marginLeft: 26,
  },
  botaoCentralizado: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 10,
  },
  imagem: {
    width: 90,
    height: 90,
    marginBottom: 30,
  },
});

export default Tela_Login;

