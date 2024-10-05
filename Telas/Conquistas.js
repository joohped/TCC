import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View, ImageBackground, Dimensions, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { initializeApp} from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { doc, getFirestore, getDoc, setDoc } from '@firebase/firestore';
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
  const db = getFirestore(app);

export default function Conquistas({navigation}) {

    const auth = getAuth();

    const route = useRoute();
  const params = route.params;

  const userData = params.userData || params; 

  const {
        email,
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
        personagemEscolhido,
        fontSize,
        scale
  } = userData;

  const [items, setItems] = useState([0]);

  const handleScroll = ({ nativeEvent }) => {
    const isCloseToBottom = nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20;
    if (isCloseToBottom) {
      setItems((prevItems) => [...prevItems, prevItems.length + 1]);
    }
  };

  const [personageEscolhido, setPersonageEscolhido] = useState(null);

  useEffect(() => {
    var imagem;
    
    switch (personagemEscolhido) {
      case 'personagem1':
        imagem = require('../img/circuloTommy.png');

        break;
      case 'personagem2':
        imagem = require('../img/circuloToby.png');

        break;
      case 'personagem3':
        imagem = require('../img/circuloBella.png');

        break;
      case 'personagem4':
        imagem = require('../img/circuloBob.png');

        break;
      case 'personagem5':
        imagem = require('../img/circuloBete.png');

        break;

      default:
        imagem = null;
    }

    setPersonageEscolhido(imagem);
  }, [personagemEscolhido]);

  const [fontsLoaded] = useFonts({
    SunBorn: require('../fonts/QuickDelight.otf'),
  });

  const Voltar = async () => {
    navigation.navigate('Tela_Home', { 
        email,
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
        personagemEscolhido,
        scale,
        fontSize});
  };

  const Perfil = async () => {
    navigation.navigate('Perfil', { 
      email,
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
      personagemEscolhido,
      scale,
      fontSize
        });
    };

  return (

    
      <ImageBackground style={{ width: width , height: height+10 , top: 15, alignItems: 'center' }} source={require('../img/fundoConquistas.png')}> 

        <View style={{backgroundColor: '#9BCB3C', shadowColor: "#000", elevation: 4, height: 150, width: width, borderBottomEndRadius: 50, borderBottomStartRadius: 50, top: -25}}>

            <View style={styles.containerPersonagem}>
                <TouchableOpacity onPress={Perfil} style={{ width: 70, zIndex: 1000,   left: 310, top: 55}}>
                {personageEscolhido && (
                <Image 
                    source={personageEscolhido} 
                    style={styles.imagemPersonagem}
                />
                )}
                </TouchableOpacity>
            </View>

           <Image source={require('../img/tituloConquistas.png')} style={{ width: 170 , height: 70  , top: -10, left: 115 }} />

           <TouchableOpacity onPress={Voltar} style={{width: 40, height: 40, top: -65, left: 35}}>
            <Image source={require('../img/voltarDesafios.png')} style={{ width: 25 , height: 28, top: 5, left: 5 }} />
          </TouchableOpacity>

        </View>
        <ScrollView style={{width: width,  marginTop: -25}} contentContainerStyle={{alignItems:'center'}} onScroll={handleScroll} >
          <View style={{backgroundColor: '#BAD487', shadowColor: "#000", height: 100, width: 320, borderRadius: 30, marginTop: 20, top: 5, alignItems: 'center', justifyContent: 'center'}}>

                <Text style={{color: 'white', fontSize: 23.5, width: 200, textAlign: 'center', fontFamily:'QuickDelight'}}>Ver todas as minhas conquistas!</Text>

            </View>
        {items.map((item, index) => (
          <View key={index} style={{alignItems: 'center',  height: 695}}>

            <View style={{ height: 125, width: 130, top: 40, left: 60, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125}} />
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />

            </View>
            
            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />

            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />

            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />

            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />

            </View>

        </View>
        ))}
       </ScrollView>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
    imagemPersonagem: {
        width: 70,
        height: 70,
        zIndex: 1000
      },
      containerPersonagem: {
        zIndex: 1000,
      }
});