import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions, Animated } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { initializeApp } from '@firebase/app';
import { getFirestore, doc, setDoc } from '@firebase/firestore';
import {useFonts} from 'expo-font';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const characters = [
    { id: '5', source: require('../img/circuloBete.png'), route: 'Personagem5' },
    { id: '1', source: require('../img/circuloTommy.png'), route: 'Personagem1' },
    { id: '2', source: require('../img/circuloToby.png'), route: 'Personagem2' },
    { id: '3', source: require('../img/circuloBella.png'), route: 'Personagem3' },
    { id: '4', source: require('../img/circuloBob.png'), route: 'Personagem4' },
  ];
  

const { width } = Dimensions.get('window');


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
const db = getFirestore(app);

const Personagem5 = ({ route, navigation }) => {
  const {
    email,
    senha,
    nome_r,
    nome_usuario,
    data_nasc_resp,
    data_nasc_usua,
    alergia,
    alergia_outro,
    comida_gosta,
    comidaFavorita_outro,
    comidasFavoritas,
    texturaFavorita_outro,
    texturasFavoritas,
    saborFavorito_outro,
    saboresFavoritos,
    comida_evita,
    comidasEvita,
    comidasEvita_outro,
    texturasEvita,
    texturasEvita_outro,
    saboresEvita,
    saboresEvita_outro
  } = route.params;

  const [personagemEscolhido, setPersonagemEscolhido] = useState(null);
  const auth = getAuth();
  const Casa = async () => {
    navigation.navigate('Inicio');
  };

  const handleFinalizarCadastro = async (personagem) => {
    let personagemImagem;
    switch (personagem) {
      case 'personagem5':
        personagemImagem = require('../img/circuloBete.png');
        break;
      default:
        personagemImagem = null;
    }

    setPersonagemEscolhido(personagemImagem);

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        email,
        senha,
        nome_r,
        nome_usuario,
        data_nasc_resp,
        data_nasc_usua,
        alergia,
        alergia_outro,
        comida_gosta,
        comidaFavorita_outro,
        comidasFavoritas,
        texturaFavorita_outro,
        texturasFavoritas,
        saborFavorito_outro,
        saboresFavoritos,
        comida_evita,
        comidasEvita,
        comidasEvita_outro,
        texturasEvita,
        texturasEvita_outro,
        saboresEvita,
        saboresEvita_outro,
        personagemEscolhido: personagem,
        uid: user.uid
      });


      navigation.navigate('CadastroSplash3', {
        email,
        senha,
        nome_r,
        nome_usuario,
        data_nasc_resp,
        data_nasc_usua,
        alergia,
        alergia_outro,
        comida_gosta,
        comidaFavorita_outro,
        comidasFavoritas,
        texturaFavorita_outro,
        texturasFavoritas,
        saborFavorito_outro,
        saboresFavoritos,
        comida_evita,
        comidasEvita,
        comidasEvita_outro,
        texturasEvita,
        texturasEvita_outro,
        saboresEvita,
        saboresEvita_outro,
        personagemEscolhido: personagemImagem
      });
    } catch (error) {
      console.error('Erro na criação do usuário:', error.message);
    }
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  const renderCharacter = ({ item, index }) => {
    const inputRange = [
      (index - 0.8) * (width * 0.3 + 10),
      index * (width * 0.3 + 10),
      (index + 0.8) * (width * 0.3 + 10),
    ];
    const escala = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1.2, 0.5],
      extrapolate: 'clamp',
    });
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [60, -10, 60],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.route, 
            {
            email,
            senha,
            nome_r,
            nome_usuario,
            data_nasc_resp,
            data_nasc_usua,
            alergia,
            alergia_outro,
            comida_gosta,
            comidaFavorita_outro,
            comidasFavoritas,
            texturaFavorita_outro,
            texturasFavoritas,
            saborFavorito_outro,
            saboresFavoritos,
            comida_evita,
            comidasEvita,
            comidasEvita_outro,
            texturasEvita,
            texturasEvita_outro,
            saboresEvita,
            saboresEvita_outro,
          })}
        style={styles.containerItem}
      >
        <Animated.View style={[styles.item, { transform: [{ escala }, { translateY }] }]}>
          <Image source={item.source} style={styles.imagemPersonagem} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const [fontsLoaded] = useFonts({
    'QuickDelight': require('../fonts/QuickDelight.otf'),
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
      <TouchableOpacity onPress={Casa} style={{ zIndex: 1000}}>
        <Image source={require('../img/home.png')} style={styles.iconeCasa} />
      </TouchableOpacity>
        <Image source={require('../img/beteAbacate.png')} style={styles.imagemTitulo} />
        <Image source={require('../img/personagem5.png')} style={styles.personagemImagem} />

        <View style={styles.botaoCurvado} />
        <View style={styles.fundo}>
          <Text style={styles.fundo2}>
           Bete Abacate é a mais nova do grupo, adora moda e está sempre pronta para festejar.
          </Text>
        </View>
        
        <View style={styles.containerListaPersonagem}>
          <AnimatedFlatList
            horizontal
            data={characters}
            keyExtractor={(item) => item.id}
            bounces={false}
            decelerationRate="fast"
            snapToInterval={width * 0.3 + 10}
            contentContainerStyle={styles.listaPersonagem}
            scrollEventThrottle={16} 
            renderItem={renderCharacter}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
          />
          <TouchableOpacity style={styles.botaoEscolhido} onPress={() => handleFinalizarCadastro('personagem5')}>
            <Image
              source={require('../img/botaoEscolher.png')}
              style={styles.imagemBotaoEscolhido}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container2: {
    flex: 1,
    paddingHorizontal: 10,
  },
  iconeCasa: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 30,
    marginTop: 25,
  },
  imagemTitulo: {
    width: 220,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
  },
  personagemImagem: {
    width: 350,
    height: 940,
    resizeMode: 'contain',
    marginLeft: 30,
    marginTop: -230,
  },
  botaoCurvado: {
    width: Dimensions.get('window').width,
    height: 190,
    backgroundColor: '#D1D1D1',
    borderRadius: 400,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerListaPersonagem: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 120,
    width: '110%',
    justifyContent: 'center',
  },
  listaPersonagem: {
    marginLeft: 140,
    width: '223%',
    alignItems: 'center',
  },
  containerItem: {
    width: width * 0.3 + 10, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '70%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagemPersonagem: {
    width: '80%',
    height: '100%',
    resizeMode: 'contain',
  },
  fundo: {
    marginBottom: 90,
    position: 'absolute',
    bottom: 120,
    paddingHorizontal: 20,
    backgroundColor: '#9BCB3CB2',
    borderRadius: 50,
    marginLeft: 40,
  },
  fundo2: {
    width: 300,
    height: 110,
    color: 'white',
    fontFamily: 'QuickDelight',
    textAlign: 'center',
    fontSize: 22,
    padding: 20,
  },
  botaoEscolhido: {
    backgroundColor: '#9BCB3C',
    width: Dimensions.get('window').width + 20,
    height: 110,
    bottom: -120,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagemBotaoEscolhido: {
    width: 111,
    height: 42,
    resizeMode: 'contain',
  },
});




export default Personagem5;

